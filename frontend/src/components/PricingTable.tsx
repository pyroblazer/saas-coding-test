import { Pricing } from "../types";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
    pricing: Pricing[];
    onViewHistory: (pricingId: string) => void;
}

const PricingTable: React.FC<Props> = ({ pricing, onViewHistory }) => (
    <div className="m-10 flex flex-row justify-center text-left">
        <h2 className="font-medium text-lg">Pricing</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price (Currency)</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pricing.map(price => (
                    <TableRow key={price.pricing_id}>
                        <TableCell>{price.product.product_name}</TableCell>
                        <TableCell>{price.price} ({price.customer.currency})</TableCell>
                        <TableCell>{new Date(price.effective_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button onClick={() => onViewHistory(price.pricing_id)}>
                                View Price History
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

export default PricingTable;
