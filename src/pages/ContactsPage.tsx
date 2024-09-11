import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addContact, deleteContact, updateContact } from '../store/contactSlice';

const ContactsPage = () => {
  const [form, setForm] = useState({ id: '', name: '', email: '', phone: '', status: 'active' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  // Handle form submission for both add and edit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.id) {
      dispatch(updateContact(form)); // If editing
    } else {
      dispatch(addContact({ ...form, id: Date.now().toString() })); // If adding new
    }
    resetForm();
  };

  // Open Edit Modal
  const handleEdit = (contact: any) => {
    setForm(contact);
    setIsEditModalOpen(true);
  };

  // Handle deletion
  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  // Reset form and close modals
  const resetForm = () => {
    setForm({ id: '', name: '', email: '', phone: '', status: 'active' });
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800">Contact Management</h2>
      
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Contact
      </button>

      {/* Display message if no contacts are found */}
      {!contacts.length && (
        <div className="bg-green-100 p-4 rounded-md mb-4 text-green-700">
          <p>No contacts found. Please add a contact.</p>
        </div>
      )}

<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto my-10">
  {contacts.map((contact) => (
    <li
      key={contact.id}
      className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-md shadow-sm w-full"
    >
      <div className="flex flex-col items-center space-y-4 mb-4">
        <img
          src={`https://i.pravatar.cc/150?u=${contact.id}`} // Placeholder image
          alt={contact.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex flex-col flex-wrap items-start text-left space-y-1.5 w-auto">
          <span className="text-lg font-medium text-gray-800">{contact.name}</span>
          <span className="text-sm text-gray-600">{contact.email}</span>
        </div>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <button
          onClick={() => handleEdit(contact)}
          className="w-full px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(contact.id)}
          className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>


      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-4">Create New Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={form.status === 'active'}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={form.status === 'inactive'}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={form.status === 'active'}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={form.status === 'inactive'}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Editted Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
