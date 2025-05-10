// Done!
// Note: Used MongoDB Compass with the Community Server - Offline Database!
// Introduce validations - WIP!

const express = require("express");
const mongoose = require("mongoose");
const Item = require("./itemModel");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8100;

// const MONGODB_URI = "mongodb+srv://ogtosin:<password>@cluster0.zhodrnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Used MongoDB Compass with the Community Server - Offline Server!
// const MONGODB_URI = "mongodb://localhost:27017/";

const MONGODB_URI =
  "mongodb+srv://ogtosin:SpooFProoFLAF71@lostandfound.sjwtczp.mongodb.net/?retryWrites=true&w=majority&appName=LostAndFound";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const result = "Welcome to Week 7 Assignment Server";

app.get("/", (req, res) => {
  res.status(200).json({ message: result });
});


//Assignment Solution!

// Get all items
app.get("/all-items", async (req, res) => {
  const allItems = await Item.find();

  res.status(200).json({
    message: "Success",
    allItems,
  });
});

// Request Endpoint:
// localhost:8100/all-items

// Response:
// {
//     "message": "Success",
//     "allItems": [
//         {
//             "_id": "681f3c36e59adac33cca4fa4",
//             "itemName": "Wallet",
//             "description": "A Brown Italian Hermani LE  Wallet - Cash, ID and ATMs in it! ",
//             "locationFound": "Under the front seat of the mini bus (07)",
//             "dateFound": "2023-03-20T00:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T11:44:54.815Z",
//             "updatedAt": "2025-05-10T11:44:54.815Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f471854674cb5a3e1eb2a",
//             "itemName": "Iphone",
//             "description": "A Limited Edition Gold Plated IPhone XX! ",
//             "locationFound": "Inside the lost and found box in the the front of Jaja Hall",
//             "dateFound": "2023-03-20T00:00:00.000Z",
//             "claimed": true,
//             "createdAt": "2025-05-10T12:31:20.514Z",
//             "updatedAt": "2025-05-10T12:31:20.514Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f4a1829e71e4f071a2fe4",
//             "itemName": "Shoe",
//             "description": "A Limited Edition Silver like Italian Shoe XX! ",
//             "locationFound": "Inside the main library on the third floor ",
//             "dateFound": "2025-03-20T00:00:00.000Z",
//             "claimed": true,
//             "createdAt": "2025-05-10T12:44:08.398Z",
//             "updatedAt": "2025-05-10T13:34:32.166Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f4b8829e71e4f071a2fe7",
//             "itemName": "Laptop",
//             "description": "A Fan Edition Diamond plated Alienware Laptop",
//             "locationFound": "Inside the IT Lab on the fifth floor close to the server room, on the front row seat!",
//             "dateFound": "2025-03-20T00:00:00.000Z",
//             "claimed": true,
//             "createdAt": "2025-05-10T12:50:16.858Z",
//             "updatedAt": "2025-05-10T12:50:16.858Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f501df98c0d70a3fe8f4d",
//             "itemName": "PHY 101 TextBook",
//             "description": "A properly brown paper wrapped PHY 101 TextBook",
//             "locationFound": "Inside the PHY Lab in the Faculty of Science Building",
//             "dateFound": "2025-03-20T12:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T13:09:49.290Z",
//             "updatedAt": "2025-05-10T13:09:49.290Z",
//             "__v": 0
//         }
//     ]
// }

// 1.
// Add a found item


// Create an item
app.post("/create-item", async (req, res) => {
  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  // Validation
  if (!itemName || typeof itemName !== "string") {
    return res.status(400).json({ message: "Invalid or missing Item Name" });
  }
  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid or missing Description" });
  }
  if (!locationFound || typeof locationFound !== "string") {
    return res.status(400).json({ message: "Invalid or missing Location Found" });
  }
  if (!dateFound || isNaN(Date.parse(dateFound))) {
    return res.status(400).json({ message: "Invalid or missing Date Found" });
  }
  if (claimed !== undefined && typeof claimed !== "boolean") {
    return res.status(400).json({ message: "Invalid claimed value" });
  }

  const newItem = new Item({
    itemName,
    description,
    locationFound,
    dateFound,
    claimed,
  });

  await newItem.save();

  res.status(201).json({
    message: "Success",
    newItem,
  });
});

// Request body input:
// {
//     "itemName": "PHY 101 TextBook",
//     "description": "A properly brown paper wrapped PHY 101 TextBook",
//     "locationFound": "Inside the PHY Lab in the Faculty of Science Building",
//     "dateFound": "2025-03-20T13:00"
// }


// Response:

// {
//     "message": "Success",
//     "newItem": {
//         "itemName": "PHY 101 TextBook",
//         "description": "A properly brown paper wrapped PHY 101 TextBook",
//         "locationFound": "Inside the PHY Lab in the Faculty of Science Building",
//         "dateFound": "2025-03-20T12:00:00.000Z",
//         "claimed": false,
//         "_id": "681f501df98c0d70a3fe8f4d",
//         "createdAt": "2025-05-10T13:09:49.290Z",
//         "updatedAt": "2025-05-10T13:09:49.290Z",
//         "__v": 0
//     }
// }



// 2.
// View all unclaimed items

// Get unclaimed items
app.get("/all-items/unclaimed", async (req, res) => {
  const allItems = await Item.find();

  const unclaimed = allItems.filter((item) => item.claimed === false);
  res.status(200).json({
    message: "Success",
    unclaimed,
  });
});

// Response:

// {
//     "message": "Success",
//     "unclaimed": [
//         {
//             "_id": "681f3c36e59adac33cca4fa4",
//             "itemName": "Wallet",
//             "description": "A Brown Italian Hermani LE  Wallet - Cash, ID and ATMs in it! ",
//             "locationFound": "Under the front seat of the mini bus (07)",
//             "dateFound": "2023-03-20T00:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T11:44:54.815Z",
//             "updatedAt": "2025-05-10T11:44:54.815Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f4a1829e71e4f071a2fe4",
//             "itemName": "Shoe",
//             "description": "A Limited Edition Silver like Italian Shoe XX! ",
//             "locationFound": "Inside the main library on the third floor ",
//             "dateFound": "2025-03-20T00:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T12:44:08.398Z",
//             "updatedAt": "2025-05-10T12:44:08.398Z",
//             "__v": 0
//         }
//     ]
// }

// Miscellaneous ways to get unclaimed items

// app.get("/all-items/claimed", async (req, res) => {

//   const allItems = await Item.find();

//     const claimed = allItems.filter((item) => item.claimed === true)
//     res.status(200).json({
//     message: "Success",
//     claimed
//   });
// });

// app.get("/all-items/filtered", async (req, res) => {

//   const allItems = await Item.find();

//     const filtered = allItems.filter((item) => item.claimed === req.body.claimed)
//     res.status(200).json({
//     message: "Success",
//     filtered
//   });
// });



// 3.
// View one item by ID

// Get a specific item
app.get("/an-item/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID format" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({
    message: "Success",
    item,
  });
});

// Request Endpoint:
// localhost:8100/an-item/681f3c36e59adac33cca4fa4

// Response:
// {
//     "message": "Success",
//     "item": {
//         "_id": "681f3c36e59adac33cca4fa4",
//         "itemName": "Wallet",
//         "description": "A Brown Italian Hermani LE  Wallet - Cash, ID and ATMs in it! ",
//         "locationFound": "Under the front seat of the mini bus (07)",
//         "dateFound": "2023-03-20T00:00:00.000Z",
//         "claimed": false,
//         "createdAt": "2025-05-10T11:44:54.815Z",
//         "updatedAt": "2025-05-10T11:44:54.815Z",
//         "__v": 0
//     }
// }


// Miscellaneous ways to get an item

// app.get("/an-item", async (req, res) => {

//   const { id } = req.body;

//   const item = await Item.findById(id);

//     res.status(200).json({
//     message: "Success",
//     item
//   });
// });

// app.get("/an-item", async (req, res) => {

//   const { id } = req.query

//   const item = await Item.findById(id);

//     res.status(200).json({
//     message: "Success",
//     item
//   });
// });


// 4.
// Update an item’s details or mark as claimed

// Edit claim status
app.patch("/edit-item/:id", async (req, res) => {
  const { id } = req.params;
  const { claimed } = req.body;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID format" });
  }

  // Validate claimed value
  if (claimed === undefined || typeof claimed !== "boolean") {
    return res.status(400).json({ message: "Invalid or missing claimed value" });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.claimed = claimed;
  await item.save();

  res.status(201).json({
    message: "Success",
    item,
  });
});


//Request Endpoint:
// localhost:8100/edit-item/681f4a1829e71e4f071a2fe4

// Request body input:
// {
//     "claimed": true
// }

// Response:
// {
//     "message": "Success",
//     "item": {
//         "_id": "681f4a1829e71e4f071a2fe4",
//         "itemName": "Shoe",
//         "description": "A Limited Edition Silver like Italian Shoe XX! ",
//         "locationFound": "Inside the main library on the third floor ",
//         "dateFound": "2025-03-20T00:00:00.000Z",
//         "claimed": true,
//         "createdAt": "2025-05-10T12:44:08.398Z",
//         "updatedAt": "2025-05-10T13:34:32.166Z",
//         "__v": 0
//     }
// }

// Edit an item
app.put("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const { itemName, description, locationFound, dateFound, claimed } = req.body;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID format" });
  }

  // Validation
  if (itemName !== undefined && typeof itemName !== "string") {
    return res.status(400).json({ message: "Invalid itemName" });
  }
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description" });
  }
  if (locationFound !== undefined && typeof locationFound !== "string") {
    return res.status(400).json({ message: "Invalid locationFound" });
  }
  if (dateFound !== undefined && isNaN(Date.parse(dateFound))) {
    return res.status(400).json({ message: "Invalid dateFound" });
  }
  if (claimed !== undefined && typeof claimed !== "boolean") {
    return res.status(400).json({ message: "Invalid claimed value" });
  }

  const item = await Item.findByIdAndUpdate(
    id,
    { itemName, description, locationFound, dateFound, claimed },
    { new: true }
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(201).json({
    message: "Success",
    item,
  });
});



//5.
// Delete old/irrelevant entries

// Delete an item
app.delete("/delete-item/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid item ID format" });
  }

  const item = await Item.findByIdAndDelete(id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({
    message: "Success"
  });
});


// Request Endpoint:
// localhost:8100/delete-item/681f4a1829e71e4f071a2fe4

// Response:
// {
//     "message": "Success"
// }

//Getting All Items after deleting the item with ID 681f4a1829e71e4f071a2fe4
//
// {
//     "message": "Success",
//     "allItems": [
//         {
//             "_id": "681f3c36e59adac33cca4fa4",
//             "itemName": "Wallet",
//             "description": "A Brown Italian Hermani LE  Wallet - Cash, ID and ATMs in it! ",
//             "locationFound": "Under the front seat of the mini bus (07)",
//             "dateFound": "2023-03-20T00:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T11:44:54.815Z",
//             "updatedAt": "2025-05-10T11:44:54.815Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f471854674cb5a3e1eb2a",
//             "itemName": "Iphone",
//             "description": "A Limited Edition Gold Plated IPhone XX! ",
//             "locationFound": "Inside the lost and found box in the the front of Jaja Hall",
//             "dateFound": "2023-03-20T00:00:00.000Z",
//             "claimed": true,
//             "createdAt": "2025-05-10T12:31:20.514Z",
//             "updatedAt": "2025-05-10T12:31:20.514Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f4b8829e71e4f071a2fe7",
//             "itemName": "Laptop",
//             "description": "A Fan Edition Diamond plated Alienware Laptop",
//             "locationFound": "Inside the IT Lab on the fifth floor close to the server room, on the front row seat!",
//             "dateFound": "2025-03-20T00:00:00.000Z",
//             "claimed": true,
//             "createdAt": "2025-05-10T12:50:16.858Z",
//             "updatedAt": "2025-05-10T12:50:16.858Z",
//             "__v": 0
//         },
//         {
//             "_id": "681f501df98c0d70a3fe8f4d",
//             "itemName": "PHY 101 TextBook",
//             "description": "A properly brown paper wrapped PHY 101 TextBook",
//             "locationFound": "Inside the PHY Lab in the Faculty of Science Building",
//             "dateFound": "2025-03-20T12:00:00.000Z",
//             "claimed": false,
//             "createdAt": "2025-05-10T13:09:49.290Z",
//             "updatedAt": "2025-05-10T13:09:49.290Z",
//             "__v": 0
//         }
//     ]
// }





// itemName,
// description,
// locationFound,
// dateFound,
// claimed
