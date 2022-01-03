import { useMoralis } from "react-moralis";

export default function TxTable({ txnsData, tokenTransfers, nftTransfers, tokenBalances, accountNFTs }) {
    const { Moralis } = useMoralis();

    function getUTCTimestamp(blockTimestamp) {
        const pad = (n, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
        const d = new Date(blockTimestamp);

        return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
            d.getSeconds()
        )}.${pad(d.getMilliseconds(), 3)}`;
    }

    function getTimestamp(blockTimestamp) {
        var date = new Date(blockTimestamp);
        var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

        return getUTCTimestamp(new Date(now_utc).toUTCString().toString().slice(0, 25));
    }

    const copy = async (event) => {
        const reqStr = event.target.parentNode.querySelector("span").dataset.address;
        await navigator.clipboard.writeText(reqStr);
        alert("Text copied");
    };

    return (
        <>
            <div className="grid w-11/12 mt-10">
                <ul className="items-start nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tables" role="tablist">
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
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-token-balances"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active:text-primary-100"
                            id="tabs-token-balances-all"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-token-balances"
                            role="tab"
                            aria-controls="tabs-token-balances"
                            aria-selected="false"
                        >
                            Erc20 Token Balances
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            href="#tabs-nft-balances"
                            className="nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100 active:border-primary-100 focus:border-primary-100 active:text-primary-100"
                            id="tabs-nft-balances-all"
                            data-bs-toggle="pill"
                            data-bs-target="#tabs-nft-balances"
                            role="tab"
                            aria-controls="tabs-nft-balances"
                            aria-selected="false"
                        >
                            NFT Balances
                        </a>
                    </li>
                </ul>
                <div className="tab-content" id="tabs-tabContent3">
                    {/* Transactions */}
                    <div className="tab-pane fade show active" id="tabs-txns" role="tabpanel" aria-labelledby="tabs-transactions-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr>
                                    <th className="p-3">Date Time (UTC)</th>
                                    <th className="p-3 text-left">Txn Hash</th>
                                    <th className="p-3 text-left">Block</th>
                                    <th className="p-3 text-left">From</th>
                                    <th className="p-3 text-left">To</th>
                                    <th className="p-3 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {txnsData
                                    ? txnsData.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.hash}>
                                                      {tx.hash.slice(0, 8)}...
                                                      {tx.hash.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">{tx.block_number}</td>
                                              <td className="p-3">
                                                  <span data-address={tx.from_address}>
                                                      {tx.from_address.slice(0, 7)}...
                                                      {tx.from_address.slice(-5)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.to_address}>{tx.to_address ? tx.to_address : null}</span>{" "}
                                                  {tx.to_address ? <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i> : "-"}
                                              </td>
                                              <td className="p-3">{parseFloat(parseFloat(Moralis.Units.FromWei(tx.value).toString()).toFixed(6))}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* ERC 20 Txns */}
                    <div className="tab-pane fade" id="tabs-erc20" role="tabpanel" aria-labelledby="tabs-erc20-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr>
                                    <th className="p-3">Date Time (UTC)</th>
                                    <th className="p-3 text-left">ERC20 Contract</th>
                                    <th className="p-3 text-left">Txn Hash</th>
                                    <th className="p-3 text-left">From</th>
                                    <th className="p-3 text-left">To</th>
                                    <th className="p-3 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {tokenTransfers
                                    ? tokenTransfers.map((tx, index) => (
                                          <tr className="bg-zinc-200" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.address}>
                                                      {tx.address.slice(0, 8)}...
                                                      {tx.address.slice(-6)}
                                                  </span>{" "}
                                                  <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                              </td>
                                              <td className="p-3">
                                                  <span data-address={tx.transaction_hash}>
                                                      {tx.transaction_hash.slice(0, 8)}...
                                                      {tx.transaction_hash.slice(-6)}
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
                                              <td className="p-3">{parseFloat(parseFloat(Moralis.Units.FromWei(tx.value).toString()).toFixed(2))}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* ERC 721 Txns */}
                    <div className="tab-pane fade" id="tabs-erc721" role="tabpanel" aria-labelledby="tabs-erc721-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr className="erc721-txns">
                                    <th className="p-3">Date Time (UTC)</th>
                                    <th className="p-3 text-left">Txn Hash</th>
                                    <th className="p-3 text-left">Token Address</th>
                                    <th className="p-3 text-left">Token ID</th>
                                    <th className="p-3 text-left">From</th>
                                    <th className="p-3 text-left">To</th>
                                    <th className="p-3 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {nftTransfers
                                    ? nftTransfers.map((tx, index) =>
                                          tx.contract_type === "ERC721" ? (
                                              <tr className="bg-zinc-200 erc721-txns" key={index}>
                                                  <td className="p-3">
                                                      <div className="flex align-items-center">
                                                          <div className="ml-3">
                                                              <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                          </div>
                                                      </div>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.transaction_hash}>
                                                          {tx.transaction_hash.slice(0, 8)}...
                                                          {tx.transaction_hash.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.token_address}>
                                                          {tx.token_address.slice(0, 8)}...
                                                          {tx.token_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">{tx.token_id}</td>
                                                  <td className="p-3">
                                                      <span data-address={tx.from_address}>
                                                          {tx.from_address.slice(0, 8)}...
                                                          {tx.from_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.to_address}>
                                                          {tx.to_address.slice(0, 8)}...
                                                          {tx.to_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">{parseFloat(parseFloat(Moralis.Units.FromWei(tx.value).toString()).toFixed(2))}</td>
                                              </tr>
                                          ) : null
                                      )
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* ERC 1155 Txns */}
                    <div className="tab-pane fade" id="tabs-erc1155" role="tabpanel" aria-labelledby="tabs-erc1155-txns">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr className="erc1155-txns">
                                    <th className="p-3">Date Time (UTC)</th>
                                    <th className="p-3 text-left">Txn Hash</th>
                                    <th className="p-3 text-left">Token Address</th>
                                    <th className="p-3 text-left">Token ID</th>
                                    <th className="p-3 text-left">From</th>
                                    <th className="p-3 text-left">To</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {nftTransfers
                                    ? nftTransfers.map((tx, index) =>
                                          tx.contract_type === "ERC1155" ? (
                                              <tr className="bg-zinc-200 erc1155-txns" key={index}>
                                                  <td className="p-3">
                                                      <div className="flex align-items-center">
                                                          <div className="ml-3">
                                                              <div className="">{getTimestamp(tx.block_timestamp).slice(0, 19)}</div>
                                                          </div>
                                                      </div>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.transaction_hash}>
                                                          {tx.transaction_hash.slice(0, 8)}...
                                                          {tx.transaction_hash.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.token_address}>
                                                          {tx.token_address.slice(0, 8)}...
                                                          {tx.token_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">{tx.token_id}</td>
                                                  <td className="p-3">
                                                      <span data-address={tx.from_address}>
                                                          {tx.from_address.slice(0, 8)}...
                                                          {tx.from_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">
                                                      <span data-address={tx.to_address}>
                                                          {tx.to_address.slice(0, 8)}...
                                                          {tx.to_address.slice(-6)}
                                                      </span>{" "}
                                                      <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i>
                                                  </td>
                                                  <td className="p-3">{tx.amount}</td>
                                                  <td className="p-3">{parseFloat(parseFloat(Moralis.Units.FromWei(tx.value).toString()).toFixed(8))}</td>
                                              </tr>
                                          ) : null
                                      )
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* Token Balances */}
                    <div className="tab-pane fade" id="tabs-token-balances" role="tabpanel" aria-labelledby="tabs-token-balances-all">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr className="token-balances">
                                    <th className="p-3">Name</th>
                                    <th className="p-3 text-left">Symbol</th>
                                    <th className="p-3 text-left">Token Address</th>
                                    <th className="p-3 text-left">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {tokenBalances
                                    ? tokenBalances.map((token, index) => (
                                          <tr className="bg-zinc-200 token-balances" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center">
                                                      <div className="ml-3">
                                                          <div className="">{token.name}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">{token.symbol}</td>
                                              <td className="p-3">{token.token_address}</td>
                                              <td className="p-3">
                                                  {parseFloat(parseFloat(Moralis.Units.FromWei(token.balance, token.decimals).toString()).toFixed(2))}
                                              </td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {/* NFT Balances */}
                    <div className="tab-pane fade" id="tabs-nft-balances" role="tabpanel" aria-labelledby="tabs-nft-balances-all">
                        <table className="w-full table table-auto text-gray-400 border-separate space-y-6 text-sm">
                            <thead className="bg-zinc-900 text-zinc-50">
                                <tr className="nft-balances">
                                    <th className="p-3">Token Address</th>
                                    <th className="p-3 text-left">Contract Type</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Symbol</th>
                                    <th className="p-3 text-left">Token ID</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Token URI</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {accountNFTs
                                    ? accountNFTs.map((nft, index) => (
                                          <tr className="bg-zinc-200 nft-balances" key={index}>
                                              <td className="p-3">
                                                  <div className="flex align-items-center justify-center">
                                                      <div className="ml-3">
                                                          <div>{nft.token_address}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="p-3">{nft.contract_type}</td>
                                              <td className="p-3">{nft.name}</td>
                                              <td className="p-3">{nft.symbol}</td>
                                              <td className="p-3">{nft.token_id}</td>
                                              <td className="p-3">{nft.amount}</td>
                                              <td className="p-3">
                                                  <span data-address={nft.token_uri}>{nft.token_uri ? nft.token_uri.slice(0, 16) + "..." : null}</span>{" "}
                                                  {nft.token_uri ? <i className="far fa-copy ml-1 cursor-pointer" onClick={copy}></i> : "-"}
                                              </td>
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
