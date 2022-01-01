import { useMoralis } from "react-moralis";

export default function TxTable({ displayData }) {
    const { Moralis } = useMoralis();
    Moralis.initialize("3Fg7xGs8RJcm6hqploLq21zyTJuivkud3yHrYqmZ");

    function getTimestamp(blockTimestamp) {
        const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
        const d = new Date(blockTimestamp);

        return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate() - 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
            d.getSeconds()
        )}.${pad(d.getMilliseconds(), 3)}`;
    }

    const copy = async (event) => {
        const reqStr = event.target.parentNode.querySelector("span").dataset.address;
        await navigator.clipboard.writeText(reqStr);
        alert("Text copied");
    };

    console.log(displayData);

    return (
        <>
            <div className="grid w-5/6">
                <ul
                    className="items-start nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 mt-16"
                    id="tabs-tables"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-txns"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 parent hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active active:text-primary-100"
                            id="tabs-transactions-txns"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-txns"
                            role="tab"
                            aria-controls="tabs-txns"
                            aria-selected="true"
                        >
                            Transactions
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-erc20"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active:text-primary-100"
                            id="tabs-erc20-txns"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-erc20"
                            role="tab"
                            aria-controls="tabs-erc20"
                            aria-selected="false"
                        >
                            Erc20 Token Txns
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-erc721"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active:text-primary-100"
                            id="tabs-erc721-txns"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-erc721"
                            role="tab"
                            aria-controls="tabs-erc721"
                            aria-selected="false"
                        >
                            Erc721 Token Txns
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-erc1155"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active:text-primary-100"
                            id="tabs-erc1155-txns"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-erc1155"
                            role="tab"
                            aria-controls="tabs-erc1155"
                            aria-selected="false"
                        >
                            Erc1155 Token Txns
                        </a>
                    </li>
                </ul>
                <div className="tab-content" id="tabs-tabContent3">
                    <div className="tab-pane fade show active" id="tabs-txns" role="tabpanel" aria-labelledby="tabs-transactions-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
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
                                {displayData
                                    ? displayData.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.block_hash}>
                                                      {tx.block_hash.slice(0, 8)}...
                                                      {tx.block_hash.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  {tx.from_address.slice(0, 7)}...
                                                  {tx.from_address.slice(-5)}
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.to_address}>{tx.to_address}</span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">{Moralis.Units.FromWei(tx.value).toString().slice(0, 5)}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="tabs-erc20" role="tabpanel" aria-labelledby="tabs-erc20-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
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
                                {displayData
                                    ? displayData.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.block_hash}>
                                                      {tx.block_hash.slice(0, 8)}...
                                                      {tx.block_hash.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  {tx.from_address.slice(0, 7)}...
                                                  {tx.from_address.slice(-5)}
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.to_address}>{tx.to_address}</span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">{Moralis.Units.FromWei(tx.value).toString().slice(0, 5)}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="tabs-erc721" role="tabpanel" aria-labelledby="tabs-erc721-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
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
                                {displayData
                                    ? displayData.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.block_hash}>
                                                      {tx.block_hash.slice(0, 8)}...
                                                      {tx.block_hash.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  {tx.from_address.slice(0, 7)}...
                                                  {tx.from_address.slice(-5)}
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.to_address}>{tx.to_address}</span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">{Moralis.Units.FromWei(tx.value).toString().slice(0, 5)}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="tabs-erc1155" role="tabpanel" aria-labelledby="tabs-erc1155-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
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
                                {displayData
                                    ? displayData.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.block_hash}>
                                                      {tx.block_hash.slice(0, 8)}...
                                                      {tx.block_hash.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  {tx.from_address.slice(0, 7)}...
                                                  {tx.from_address.slice(-5)}
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.to_address}>{tx.to_address}</span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">{Moralis.Units.FromWei(tx.value).toString().slice(0, 5)}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
