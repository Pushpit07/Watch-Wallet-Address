import Moralis from "moralis";

export default function TxTable ({displayData}) {
    function getTimestamp (blockTimestamp) {
        const pad = (n, s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date(blockTimestamp);
        
        return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate()-1)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;
    }

    const copy = async (event) => {
        const reqStr = event.target.parentNode.querySelector("span").dataset.address;
        await navigator.clipboard.writeText(reqStr);
        alert('Text copied');
    }

    return (
        <>               
			<table className="table table-auto text-gray-400 border-separate space-y-6 text-sm mt-16">
				<thead className="bg-zinc-900 text-zinc-50">
					<tr>
						<th className="p-3">block_timestamp</th>
                        <th className="p-3 text-left">block_hash</th>
						<th className="p-3 text-left">from_address</th>
						<th className="p-3 text-left">to_address</th>
						<th className="p-3 text-left">value</th>
					</tr>
				</thead>
				<tbody className="text-gray-900">
                    {displayData.map((tx, index) => (
                        <tr className="bg-zinc-200">
                            <td className="p-3">
                                <div className="flex align-items-center">
                                    <div className="ml-3">
                                        <div className="">{getTimestamp(tx.block_timestamp).slice(0,19)}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">
                                <span data-address={tx.block_hash}>{tx.block_hash.slice(0,8)}...{tx.block_hash.slice(-6)}</span> <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                            </td>
                            <td className="p-3">
                                {tx.from_address.slice(0,7)}...{tx.from_address.slice(-5)}
                            </td>
                            <td className="p-3">
                                <span data-address={tx.to_address}>{tx.to_address}</span> <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                            </td>
                            <td className="p-3">
                                {Moralis.Units.FromWei(tx.value)}
                            </td>	
                        </tr>
                    ))}
				</tbody>
			</table>
	
        </>
    );
}
