
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface Earning {
  id: string;
  net_amount: number;
  commission_amount: number;
  created_at: string;
  status: string;
}

interface VendorEarningsProps {
  earnings: Earning[];
  totalEarnings: number;
}

const VendorEarnings = ({ earnings, totalEarnings }: VendorEarningsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Earnings</h2>
        <div className="text-lg font-semibold text-green-600">
          Total: ₹{totalEarnings.toLocaleString()}
        </div>
      </div>

      {earnings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No earnings yet</h3>
            <p className="text-gray-600">Complete bookings to start earning!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {earnings.map((earning) => (
            <Card key={earning.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">₹{Number(earning.net_amount || 0).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">
                      Commission: ₹{Number(earning.commission_amount || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(earning.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={
                    earning.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }>
                    {earning.status || 'pending'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorEarnings;
