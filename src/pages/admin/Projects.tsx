
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectImage } from '@/types/content';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash2, Upload, Image as ImageIcon, RefreshCw, X, GripVertical } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ProjectImageWithFile extends Omit<ProjectImage, 'project_id' | 'created_at' | 'updated_at'> {
  file?: File;
  project_id?: string;
  url?: string; // Add this property to fix the TypeScript errors
}

const projectSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image_url: z.string().optional(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      alt_text: z.string(),
      name: z.string(),
      is_primary: z.boolean()
    })
  ).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [projectImages, setProjectImages] = useState<ProjectImageWithFile[]>([]);
  const isMobile = useIsMobile();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      category: '',
      location: '',
      description: '',
      image_url: '',
      images: [],
    },
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not fetch projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectImages = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', projectId)
        .order('display_order', { ascending: true });
        
      if (error) throw error;
      
      return data.map((img) => ({
        id: img.id,
        image_url: img.image_url,
        url: img.image_url, // Add url property that maps to image_url
        alt_text: img.alt_text || '',
        name: img.name || '',
        is_primary: img.is_primary || false,
        display_order: img.display_order
      }));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not fetch project images',
        variant: 'destructive',
      });
      return [];
    }
  };

  const refreshProjects = async () => {
    setRefreshing(true);
    await fetchProjects();
    setRefreshing(false);
    toast({
      title: 'Refreshed',
      description: 'Projects list has been updated',
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    
    const invalidFiles = fileArray.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast({
        title: 'Files too large',
        description: `${invalidFiles.length} image(s) are larger than 5MB and were not added`,
        variant: 'destructive',
      });
    }
    
    const validFiles = fileArray.filter(file => {
      return file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/');
    });
    
    const newImages = validFiles.map(file => {
      const newId = Math.random().toString(36).substring(2, 15);
      const objectUrl = URL.createObjectURL(file);
      
      return {
        id: newId,
        file: file,
        image_url: objectUrl,
        url: objectUrl, // Add url property that maps to image_url
        alt_text: file.name.split('.')[0] || '',
        name: file.name.split('.')[0] || '',
        is_primary: projectImages.length === 0 && validFiles.indexOf(file) === 0,
        display_order: projectImages.length
      };
    });
    
    setProjectImages([...projectImages, ...newImages]);
    
    if (projectImages.length === 0 && newImages.length > 0) {
      setPreviewUrl(newImages[0].url);
      form.setValue('image_url', newImages[0].url);
    }
  };

  const handleImageDelete = (id: string) => {
    const deletedImage = projectImages.find(img => img.id === id);
    
    const updatedImages = projectImages.filter(img => img.id !== id);
    setProjectImages(updatedImages);
    
    if (deletedImage?.is_primary && updatedImages.length > 0) {
      const newPrimaryImage = { ...updatedImages[0], is_primary: true };
      const otherImages = updatedImages.slice(1);
      setProjectImages([newPrimaryImage, ...otherImages]);
      setPreviewUrl(newPrimaryImage.url);
      form.setValue('image_url', newPrimaryImage.url);
    }
    
    if (updatedImages.length === 0) {
      setPreviewUrl(null);
      form.setValue('image_url', '');
    }
    
    if (deletedImage?.file) {
      URL.revokeObjectURL(deletedImage.image_url);
    }
  };

  const handleSetPrimary = (id: string) => {
    const updatedImages = projectImages.map(img => ({
      ...img,
      is_primary: img.id === id
    }));
    
    setProjectImages(updatedImages);
    
    const primaryImage = updatedImages.find(img => img.id === id);
    if (primaryImage) {
      setPreviewUrl(primaryImage.url);
      form.setValue('image_url', primaryImage.url);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(projectImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }));
    
    setProjectImages(updatedItems);
  };

  const updateImageField = (id: string, field: 'alt_text' | 'name', value: string) => {
    const updatedImages = projectImages.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    );
    setProjectImages(updatedImages);
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error uploading image',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const uploadProjectImages = async (): Promise<{ urls: Record<string, string>, primaryImageUrl: string | null }> => {
    try {
      const uploadedUrls: Record<string, string> = {};
      let primaryImageUrl: string | null = null;
      
      for (const image of projectImages) {
        if (image.file) {
          const uploadedUrl = await uploadImage(image.file);
          uploadedUrls[image.id] = uploadedUrl;
          
          if (image.is_primary) {
            primaryImageUrl = uploadedUrl;
          }
        } else {
          uploadedUrls[image.id] = image.image_url;
          
          if (image.is_primary) {
            primaryImageUrl = image.image_url;
          }
        }
      }
      
      return { urls: uploadedUrls, primaryImageUrl };
    } catch (error) {
      console.error('Error uploading project images:', error);
      throw error;
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      let projectId: string;
      let mainImageUrl = "";
      
      const { urls: uploadedImageUrls, primaryImageUrl } = await uploadProjectImages();
      
      if (primaryImageUrl) {
        mainImageUrl = primaryImageUrl;
      } else if (uploadedImage) {
        mainImageUrl = await uploadImage(uploadedImage);
      } else if (editingProject && !data.image_url) {
        mainImageUrl = editingProject.image_url;
      }
      
      if (editingProject) {
        const { data: updatedProject, error } = await supabase
          .from('projects')
          .update({
            title: data.title,
            category: data.category,
            location: data.location,
            description: data.description,
            image_url: mainImageUrl
          })
          .eq('id', editingProject.id)
          .select();

        if (error) throw error;
        projectId = editingProject.id;
        
        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
      } else {
        const { data: newProject, error } = await supabase
          .from('projects')
          .insert({
            title: data.title,
            category: data.category,
            location: data.location,
            description: data.description,
            image_url: mainImageUrl
          })
          .select();

        if (error) throw error;
        projectId = newProject[0].id;
        
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      }
      
      if (projectImages.length > 0) {
        if (editingProject) {
          await supabase
            .from('project_images')
            .delete()
            .eq('project_id', projectId);
        }
        
        const imageRecords = projectImages.map((img, index) => {
          return {
            project_id: projectId,
            image_url: uploadedImageUrls[img.id] || img.image_url,
            alt_text: img.alt_text,
            name: img.name,
            is_primary: img.is_primary,
            display_order: index
          };
        });
        
        const { error: imagesError } = await supabase
          .from('project_images')
          .insert(imageRecords);
          
        if (imagesError) throw imagesError;
      }

      setOpen(false);
      form.reset();
      setEditingProject(null);
      setUploadedImage(null);
      setPreviewUrl(null);
      setProjectImages([]);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save project',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = async (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      category: project.category,
      location: project.location,
      description: project.description,
      image_url: project.image_url,
    });
    setPreviewUrl(project.image_url);
    
    const images = await fetchProjectImages(project.id);
    setProjectImages(images);
    
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error: imagesError } = await supabase
          .from('project_images')
          .delete()
          .eq('project_id', id);

        if (imagesError) throw imagesError;
        
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Project deleted successfully',
        });
        fetchProjects();
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to delete project',
          variant: 'destructive',
        });
      }
    }
  };

  const handleAddNew = () => {
    setEditingProject(null);
    form.reset({
      title: '',
      category: '',
      location: '',
      description: '',
      image_url: '',
    });
    setPreviewUrl(null);
    setUploadedImage(null);
    setProjectImages([]);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshProjects}
            disabled={refreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button onClick={handleAddNew}>Add New Project</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          {loading ? (
            <p className="p-4">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="p-4">No projects found. Add your first project.</p>
          ) : isMobile ? (
            <div className="divide-y">
              {projects.map((project) => (
                <div key={project.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{project.title}</h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Category:</span> {project.category}
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Location:</span> {project.location}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject
                ? 'Update the project details below'
                : 'Fill in the information for your new project'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Residential, Commercial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Project description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label htmlFor="project-images">Project Images</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <Input
                        type="file"
                        id="project-images"
                        accept="image/*"
                        onChange={handleImagesChange}
                        className="cursor-pointer"
                        multiple
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="image_url"
                      render={({ field }) => (
                        <Input 
                          type="hidden" 
                          {...field} 
                          value={field.value || ''} 
                        />
                      )}
                    />
                  </div>
                  
                  {projectImages.length > 0 ? (
                    <div className="space-y-4 mt-4">
                      <h4 className="text-sm font-medium">Project Images ({projectImages.length})</h4>
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="project-images">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-2"
                            >
                              {projectImages.map((img, index) => (
                                <Draggable key={img.id} draggableId={img.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="flex items-center gap-3 p-3 bg-muted/40 rounded-md border"
                                    >
                                      <div {...provided.dragHandleProps} className="cursor-move">
                                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                                      </div>
                                      <div className="w-16 h-16 relative flex-shrink-0">
                                        <img 
                                          src={img.url || img.image_url} 
                                          alt={img.alt_text || ''}
                                          className="w-full h-full object-cover rounded-sm"
                                        />
                                        {img.is_primary && (
                                          <div className="absolute top-0 left-0 bg-green-600 text-white text-[10px] px-1 rounded-br">
                                            Primary
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex-1 grid grid-cols-2 gap-2">
                                        <div>
                                          <Label htmlFor={`img-name-${img.id}`} className="text-xs">Name</Label>
                                          <Input 
                                            id={`img-name-${img.id}`}
                                            value={img.name || ''}
                                            onChange={(e) => updateImageField(img.id, 'name', e.target.value)}
                                            className="h-8 text-sm"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor={`img-alt-${img.id}`} className="text-xs">Alt Text</Label>
                                          <Input 
                                            id={`img-alt-${img.id}`}
                                            value={img.alt_text || ''}
                                            onChange={(e) => updateImageField(img.id, 'alt_text', e.target.value)}
                                            className="h-8 text-sm"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex gap-1">
                                        {!img.is_primary && (
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => handleSetPrimary(img.id)}
                                            title="Set as primary image"
                                          >
                                            <ImageIcon className="h-4 w-4" />
                                          </Button>
                                        )}
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          className="h-7 w-7 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                          onClick={() => handleImageDelete(img.id)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  ) : (
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mt-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Upload project images</p>
                      <p className="text-xs text-gray-400 mt-1">Max file size: 5MB per image</p>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={uploading} 
                  className="w-full sm:w-auto"
                >
                  {uploading ? 'Uploading...' : editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
