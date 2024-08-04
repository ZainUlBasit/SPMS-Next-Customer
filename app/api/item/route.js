import connectDB from "@/utils/db";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import Item from "@/models/Item";

connectDB();

//******************************************************
// working
//******************************************************
export async function GET(req, res) {
  let items;
  try {
    items = await Item.find().populate("companyId");
    if (!items) return createError(res, 404, "Items record not found!");
    return successMessage(res, items, null);
  } catch (err) {
    console.log(err);
    return createError(res, 500, err.message || err);
  }
}

// Add Item
export async function POST(req, res) {
  const reqBody = await req.json();
  let item;
  const { code, name, companyId, purchase, sale, desc } = reqBody;

  const Payload = {
    code,
    name,
    companyId,
    purchase,
    sale,
    desc,
    qty: 0,
  };

  if (!code || !name || !companyId || !purchase || !sale)
    return createError(res, 422, "required fields are undefined!");

  try {
    item = await new Item(Payload).save();
    if (!item) return createError(res, 400, "Unable to add new Item!");
    return successMessage(res, item, "Item Successfully Created!");
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
//******************************************************
// working done
//******************************************************
export async function PATCH(req, res) {
  const reqBody = await req.json();
  const { itemId, payload } = reqBody;
  console.log(itemId, payload);

  if (!itemId || !payload)
    return createError(res, 422, "Required fields are undefined!");

  let item;
  try {
    item = await Item.findById(itemId);
    if (!item) {
      return createError(res, 404, "Item with such id was not found!");
    }
    // Update item properties
    Object.assign(item, payload);
    // Save the updated item
    await item.save();
    console.log(item);
    return successMessage(res, item, "Item Successfully Updated!");
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
//******************************************************
// working
//******************************************************
const updateItemQty = async (req, res, next) => {
  // parameter
  const itemId = req.params.id;
  let item;
  // getting quantity from request
  let { itemqty } = req.body;
  const newQty = itemqty;
  // query data
  const itemFilter = { _id: itemId };
  const itemUpdate = { $inc: { itemqty: newQty } };
  try {
    item = Item.updateOne(itemFilter, itemUpdate, (err, result) => {
      if (err) {
        console.error("Failed to increment value:", err);
        res.status(500).send("Failed to increment value");
      } else {
        res.send("Value incremented successfully");
      }
    });
  } catch (err) {}
};
//******************************************************
// working
//******************************************************
const deleteItem = async (req, res, next) => {
  const { id: itemId } = req.params;
  if (!itemId) return createError(res, 422, "Invalid Item Id!");
  try {
    const DeleteItem = await Item.findByIdAndDelete(itemId);
    if (!DeleteItem)
      return createError(res, 400, "Such Item with itemId does not exist!");
    return successMessage(
      res,
      DeleteItem,
      `Item ${DeleteItem.name} is successfully deleted!`
    );
  } catch (error) {
    return createError(res, 500, error.message || error);
  }
};
