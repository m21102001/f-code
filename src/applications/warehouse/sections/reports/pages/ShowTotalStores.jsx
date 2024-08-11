import Table from "../../../../../components/shared/table/Table";
import { getTotalStores } from "../../../../../apis/reports";

const ShowTotalStores = () => {
    const tableHeaders = [

        { key: "name", value: "الإسم" },
        { key: "quantity", value: "الكميه الموجوده" },
        { key: "unit", value: "الوحده", nestedKey: "name" },


        { key: "image", value: "الصوره", type: "image" },
    ];

    return (
        <div>
            <Table
                headers={tableHeaders}

                title="جرد  المكونات فى الدار "
                fetchData={(filters, id, setIsLoading) =>
                    getTotalStores(filters, id, setIsLoading)
                }
            />
        </div>
    );
};

export default ShowTotalStores;
