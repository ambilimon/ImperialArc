
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnquiriesTable from "@/components/EnquiriesTable";

const Contacts = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Contacts</h2>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <EnquiriesTable showAll={true} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
