import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Customer } from "../types";

interface Props {
    customers: Customer[];
    onCustomerChange: (customerId: string) => void;
}

const CustomerSelect: React.FC<Props> = ({ customers, onCustomerChange }) => (
    <div className="m-10 flex flex-row justify-center">
        <h2 className="font-medium text-lg">Customer</h2>
        <Select onValueChange={onCustomerChange}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent className="bg-black opacity-100 text-white">
                <SelectGroup>
                    {customers.map(customer => (
                        <SelectItem key={customer.customer_id} value={customer.customer_id}>
                            {customer.customer_name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
);

export default CustomerSelect;
