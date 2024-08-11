import Table from "../../../../../components/shared/table/Table";
import { getClients, deleteClient } from "../../../../../apis/clients/Client";
import { useAuth } from "../../../../../context/AuthContext";
const Client = () => {
  const { user } = useAuth();
  const tableHeaders = [

    { key: "name", value: "الإسم" },
    { key: "phone", value: "رقم الموبايل" },
    { key: "military_number", value: "الرقم العسكرى" },
    // { key: "is_worker", value: "النوع" },
  ];
  const filters = [
    // { key: "name", type: "text", placeholder: "إبحث باللإسم", id: "الإسم" },
  ];
  const actions = [
    {
      type: `edit`,
      label: "تعديل",
      route: "/warehouse/clients/:id/edit-client",
    },
    {
      type: `delete`,
      label: "حذف",
    },
    {
      type: `add`,
      label: "إضافة  عميل",
      route: "/warehouse/clients/add-client",
    },
  ];

  return (
    <div>
      <Table
        headers={tableHeaders}
        title="العملاء"
        filters={filters}
        fetchData={(filterValues, currentPage, setIsLoading) =>
          getClients(filterValues, currentPage, setIsLoading)
        }
        actions={actions}
        deleteFn={deleteClient}
      />
    </div>
  );
};

export default Client;
