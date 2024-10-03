import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { PriceHistory } from "../types";

interface Props {
    history: PriceHistory[];
    productName: string;
}

const PriceHistoryChart: React.FC<Props> = ({ history, productName }) => {
    const labels = history.map(item => new Date(item.update_timestamp).toLocaleDateString());
    const data = history.map(item => item.updated_price);

    return (
        <div className="m-10 flex flex-row justify-center text-left">
            <h2 className="font-medium text-lg">Price History Chart</h2>
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: `Price history for ${productName}`,
                            data,
                            fill: true,
                            borderColor: "#F0F0F0",
                        },
                    ],
                }}
            />
        </div>
    );
};

export default PriceHistoryChart;
