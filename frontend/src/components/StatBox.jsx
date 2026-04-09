export default function StatBox({label,value}){

  return(

    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">

      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p className="text-2xl text-red-500 mt-2">
        {value}
      </p>

    </div>

  )

}