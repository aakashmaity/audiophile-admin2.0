"use client";

import Layout from "@/components/Layout";
import { Loader } from "@/components/Reactspinner";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { withSwal } from "react-sweetalert2";

const Categories = ({ swal }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  async function fetchCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);



  async function saveCategory(e) {
    try {
      e.preventDefault();
      // console.log("properties1", properties);

      if(!name){
        toast.error("Category name is required");
        return;
      }
      const data = {
        name,
        parentCategory,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values?.split(","),
        })),
      };
      
      let res;
      if (editedCategory) {
        data._id = editedCategory._id;
        res = await axios.put("/api/categories", data);
        setEditedCategory(null);
      } else {
        res = await axios.post("/api/categories", data);
      }
      toast.success(res.data?.message);

      setName("");
      setParentCategory("");
      setProperties([]);
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
    // console.log("properties", properties);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `You won't be able to revert this! ${category.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
      })
      .then(async (result) => {
        // console.log(result)
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete(`/api/categories/${_id}`);
          await swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    // console.log({index,property,newName})
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
    // console.log(properties);
  }

  function handlePropertyValueChange(index, property, newValues) {
    // console.log({index,property,newName})
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
    // console.log(properties);
  }

  function removeProperties(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }


  if(!categories){
    return <Loader/>
  }

  return (
    <Layout>
      <h1 className="text-textWhite1 mb-4">Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : `New categories name`}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            className="basicInput"
            type="text"
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0 basicInput"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  placeholder="Property name"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0 basicInput"
                  onChange={(e) =>
                    handlePropertyValueChange(index, property, e.target.value)
                  }
                  placeholder="Property value , separated"
                />
                <button
                  type="button"
                  className="btn-red text-sm mb-2"
                  onClick={(e) => removeProperties(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className=" flex gap-1">
          <button type="submit" className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-9 px-4 py-2">
            Save
          </button>
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-9 px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <th>Category name</th>
              <th>Parent category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Toaster />
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
