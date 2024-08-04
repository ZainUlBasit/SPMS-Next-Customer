"use client";
import { DeleteItemApi } from "@/Https";
import PageLoader from "@/components/Loader/PageLoader";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditItem from "@/components/Modals/EditItem";
import Search from "@/components/Search/Search";
import ItemInfoTable from "@/components/Tables/ItemInfoTable";
import TableWrapper from "@/components/Tables/TableWrapper";
import { addItem } from "@/utils/Slices/ItemCartSlice";
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
    <div className="flex justify-center items-center pt-[15vh]">
      {ItemState.loading ? (
        <PageLoader />
      ) : (
        <TableWrapper>
          <Search
            Placeholder="Search Item..."
            Value={SearchText}
            setValue={setSearchText}
          />
          {/* <ItemInfoTable
            setID={setItemId}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
            SearchText={SearchText}
            Rows={ItemState.data}
          /> */}
          <div className="flex gap-x-2 gap-y-2 flex-wrap mt-8 px-2 py-2 items-center justify-center">
            {ItemState.data.map((dt) => {
              return (
                <div className="flex flex-col justify-between items-center border-2 border-black rounded-lg h-[30vh]">
                  <div className="font-[600] font-sans text-xl bg-black text-white px-3 py-2 w-full text-center">
                    {dt.name}
                  </div>
                  <div className="font-semibold font-sans px-2">
                    Company: {dt.companyId.name}
                  </div>
                  <div className="font-semibold font-sans">Code: {dt.code}</div>
                  <div className="font-semibold font-sans">
                    Price: {dt.sale}
                  </div>
                  <div
                    className=" bg-black hover:bg-gray-700 transition-all ease-in-out duration-500 text-white text-center py-2 cursor-pointer w-full"
                    onClick={() => {
                      dispatch(addItem(dt._id));
                    }}
                  >
                    Add To Cart
                  </div>
                </div>
              );
            })}
          </div>
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
