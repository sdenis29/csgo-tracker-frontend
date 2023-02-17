import Head from 'next/head'
import useSWR from 'swr'

export const LIVE_SCORE_URL = `${process.env.NEXT_PUBLIC_API_URL}/live_score`

const useScores = () => {
  const fetcher = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data)
  }
  const { data, error } = useSWR(LIVE_SCORE_URL, fetcher)
  return {
    scores: data,
    error: error && error.message,
  }
}

export default function Live() {
  const { scores, error } = useScores()
  return (
    <>
      <Head>
        <title>CSGO-TRACKER - Sesiune LIVE</title>
        <meta name="description" content="Sesiune LIVE" />
      </Head>
      <div className="bg-slate-800 rounded-xl">
        <div className="px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                        Jucator
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-white">
                        Scor
                      </th>
                      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-white">
                        Timp Sesiune Curenta
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {scores && scores.map((score) => (
                      <tr key={score.name}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-white sm:pl-0">
                          {score.name}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-300">{score.score}</td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-300">{score.time}</td>
                      </tr>
                    ))}
                    {error}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
