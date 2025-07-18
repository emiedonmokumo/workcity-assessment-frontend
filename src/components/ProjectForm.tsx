import { NumericFormat } from "react-number-format"

const ProjectForm = ({ clients, setData, data, submit, type = 'post' }: any) => {
    return (
        <div>
            <div className="mb-5 flex flex-col space-y-3">
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Title</label>
                    <input
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        type="text"
                        placeholder="E.g. John Project"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Description</label>
                    <input
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        type="email"
                        placeholder="E.g. johndoe@gmail.com"
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Budget</label>
                    <NumericFormat
                        value={data.budget}
                        onValueChange={(values) => {
                            const { floatValue } = values;
                            setData({ ...data, budget: floatValue });
                        }}
                        thousandSeparator={true}
                        prefix={'₦'}
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                        placeholder="E.g. 1000"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Client</label>
                    <select
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                        value={data.client._id || data.client}
                        onChange={(e) => setData({ ...data, client: e.target.value })}
                        required
                    >
                        <option value=""></option>
                        {clients.map((client: any) => (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="" className="font-semibold">Status</label>
                    <select
                        className="border-2 border-gray-300 rounded-md p-2 w-80 outline-none"
                        value={data.status || "pending"}
                        onChange={(e) => setData({ ...data, status: e.target.value })}
                    >
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <button onClick={submit} className="w-80 bg-black text-white p-2 rounded-md">{type === 'post' ? 'Add' : 'Update'} Project</button>
        </div>
    )
}

export default ProjectForm
