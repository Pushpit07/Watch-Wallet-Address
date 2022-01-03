export default function AccountInfo({ account, nativeBalance }) {
    return (
        <>
            <div className="grid grid-cols-5 w-11/12 mt-16">
                <div className="col-span-3 block text-xl font-medium text-gray-800 text-left">
                    Account:&nbsp;&nbsp;<span className="text-base font-medium">{account}</span>
                </div>
                <div className="col-span-2 block text-xl font-medium text-gray-800 text-left">
                    Native Balance:&nbsp;&nbsp;<span className="text-base font-medium">{nativeBalance}</span>
                </div>
            </div>
        </>
    );
}
