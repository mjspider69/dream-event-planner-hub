
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const VendorMessages = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <Card>
        <CardContent className="p-12 text-center">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">Customer messages will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorMessages;
