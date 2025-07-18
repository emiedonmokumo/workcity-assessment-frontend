const ClientForm = ({ clientData, setClientData, submit, type = 'post' }: any) => {
    return (
        <div>
            <div className="mb-5 flex flex-col space-y-3">
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Name</label>
                    <input
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        type="text"
                        placeholder="E.g. John Doe"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Email Address</label>
                    <input
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        type="email"
                        placeholder="E.g. johndoe@gmail.com"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Phone</label>
                    <input
                        value={clientData.phone}
                        onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                        type="tel"
                        placeholder="E.g. +1234567890"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Address</label>
                    <input
                        value={clientData.address}
                        onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                        type="text"
                        placeholder="E.g. 123 Main St, City, Country"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
            </div>
            <button onClick={submit} className="w-80 bg-black text-white p-2 rounded-md">{type === 'post' ? 'Add' : 'Update'} Client</button>
        </div>
    )
}

export default ClientForm
