
// eslint-disable-next-line react/prop-types
const ProfileCard = ({name, image, grade, role}) => {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
      <img
        className="w-2/3 aspect-square object-cover rounded-full mx-auto mt-4"
        src={image}
        alt={`${name}'s profile`}
        style={{aspectRatio: 1}}
      />
      {/* <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full">
      <img
        src={image}
        alt="Profile"
        className="h-full w-auto"
      />
    </div> */}

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600">{role}</p>
        <p className="text-gray-600 mt-2">{grade}</p>

      </div>
    </div>
  )
}

export default ProfileCard