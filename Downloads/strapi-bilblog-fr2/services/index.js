export const submitComment = async (obj) => {
  const { name, email, comment, id } = obj

  //const GRAPHQL_URL = process.env.NEXT_PUBLIC_API_URL
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //  Authorization: `Bearer 700df9910baaf985dd1ac6617e84373d1aa2e7fc93b8b17f77aadd75fb612d408209c885fcf53e639a0b890c493c3c455ec580ed2db32c12c7edd0ce9bbb59ced722986295f7356e861f2e76f93d4de2aac24863493d6db893701ad3c66c49b1f933324a6ccd5055b573e7e662a888e5d0a7333de473eba201213b732b254e1d`,
    },
    body: JSON.stringify({ data: obj }),
  })

  return result.json()
}
