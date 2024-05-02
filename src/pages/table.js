import data from "@/utils/data.json";

async function getData() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=47.9077&longitude=106.8832&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo&forecast_days=16",
    {
      method: "GET",
      page: 2,
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Table() {
  return (
    <div>
      <button onClick={() => getData()}>Get Data</button>
      <table className="w-full">
        <thead>
          <tr className="*:text-start *:w-1/6 *:font-medium *:border-b *:border-b-slate-700 *:p-8 *:py-4 bg-slate-600 text-slate-300">
            <th className="!w-1/3">Full Name</th>
            <th>Birthday</th>
            <th>Height</th>
            <th>Age</th>
            <th>Hobbies</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((e, i) => (
              <tr
                key={i}
                className="*:border-b *:p-8 *:py-4 bg-slate-800 *:border-b-slate-700 text-slate-300"
              >
                <td className="text-white font-semibold">
                  {e.firstname} {e.lastname}
                </td>
                <td>{new Date(e.createdDate).toDateString()}</td>
                <td>{e.height}</td>
                <td>{e.age}</td>
                <td>
                  {e.hobbies.map((el, indx) => (
                    <div key={indx}>{el.title}</div>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
