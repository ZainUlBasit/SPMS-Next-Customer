"use client";
import { DeleteItemApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditItem from "@/components/Modals/EditItem";
import Search from "@/components/Search/Search";
import ItemInfoTable from "@/components/Tables/ItemInfoTable";
import TableWrapper from "@/components/Tables/TableWrapper";
import { fetchItems } from "@/utils/Slices/ItemSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ItemInfo() {
  const dispatch = useDispatch();
  const [SearchText, setSearchText] = useState("");
  const [ItemId, setItemId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const ItemState = useSelector((state) => state.ItemState);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <div className="flex justify-center items-center">
      {ItemState.loading ? (
        <PageLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder="Search Item..."
            Value={SearchText}
            setValue={setSearchText}
          />
          <ItemInfoTable
            setID={setItemId}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            SearchText={SearchText}
            Rows={ItemState.data}
          />
        </TableWrapper>
      )}
      {OpenEditModal && (
        <EditItem
          open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentItem={ItemState.data.find((dt) => dt._id === ItemId)}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteItemApi({ itemId: ItemId });
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchItems());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
    </div>
  );
}
