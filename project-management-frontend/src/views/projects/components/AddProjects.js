import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { addProject } from "../store/projectsSlice";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(people[3]);
  console.log("assigned to=",selected)
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    assigned_to: selected.name,
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().format("YYYY-MM-DD"),
  });

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch addProject action with formData
      dispatch(addProject(formData));
      navigate('/projects')
      // Reset form after successful submission
      setFormData({
        title: "",
        priority: "",
        assigned_to: selected,
        start_date: dayjs().format("YYYY-MM-DD"),
        end_date: dayjs().format("YYYY-MM-DD"),
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  return (
    <div>
      <header className="bg-white shadow">
        <div className="px-4 py-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Add Projects
          </h1>
        </div>
      </header>
      <main className="px-4 lg:px-8 py-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="">
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 mb-1"
              >
                Projects Title
              </label>
              <input
                name="title"
                placeholder="project title"
                value={formData.title}
                onChange={handleChange}
                class="w-full rounded-md border-0 p-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="">
              <label
                htmlFor="priority"
                className="block font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border-0 px-2 py-2.5 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled selected>
                  Select priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label htmlFor="assigned_to" className="block mb-1 font-medium text-gray-700">
                      Assigned to
                    </Listbox.Label>
                    <div className="relative">
                      <Listbox.Button
                        value={formData.assigned_to}
                        onChange={handleChange}
                        className="relative w-full cursor-default rounded-md bg-white py-2 pl-2 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <img
                            src={selected.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span className="ml-3 block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <img
                                      src={person.avatar}
                                      alt=""
                                      className="h-5 w-5 flex-shrink-0 rounded-full"
                                    />
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="">
              <label
                htmlFor="start_date"
                className="block font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <DatePicker
                name="start_date"
                className="w-full rounded-md border-0 p-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
                selected={formData.start_date}
                onChange={(date) => handleDateChange(date, "start_date")}
                dateFormat="yyyy, mm, dd"
                placeholderText="Select a date"
              />
            </div>
            <div className="">
              <label
                htmlFor="end_date"
                className="block font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <DatePicker
                name="end_date"
                className="w-full rounded-md border-0 p-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-indigo-600 sm:text-sm sm:leading-6"
                selected={formData.end_date}
                onChange={(date) => handleDateChange(date, "end_date")}
                dateFormat="yyyy, mm, dd"
                placeholderText="Select a date"
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="px-3 py-1 bg-gray-800 rounded text-white"
            >
              Add project
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProjects;
