import data from "@/utils/data.json";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 p-6">
        {data
          .filter((e) => e.age > 16)
          .map((e, i) => 
            <div className="border w-full p-4" key={i}>
              <p>
                Name: {e.firstname} {e.lastname}
              </p>
              <p>Class: {e.class}</p>
              <p>Height: {e.height}</p>
              <div className="flex flex-col gap-4">
                Hobbies:
                {e.hobbies.length > 0 ? (
                  e.hobbies.map((el, i) => {
                    return (
                      <div className="text-sm border p-2" key={i}>
                        <p>
                          Hobby {el.id + 1}: {el.title}
                        </p>
                        <p>How long: {el.date ? el.date : "No info"}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No hobbies</p>
                )}
              </div>
            </div>
          )}
      </div>
      <select>
        {data.map((e, i) => <option key={i}>{e.firstname}</option>)}
      </select>
      <select>
        {data.filter(e => e.gender == 'male').map((e, i) => <option key={i}>{e.firstname}</option>)}
      </select>
    </div>
  );
}
