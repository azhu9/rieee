import {FaLinkedin } from 'react-icons/fa'
// eslint-disable-next-line react/prop-types
const ProfileCard = ({name, image, grade, role}) => {
  return (
    <div className=" md:w-60 sm:w-45 bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
      <img
        className="w-full aspect-square object-cover"
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

      <div className="p-4 relative">
        <h2 className="md:text-xl sm:text-md font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 md:text-lg text-sm">{role}</p>
        <div className="flex w-full">
          <p className="text-gray-600 md:text-lg text-sm">{grade}</p>
        </div>

        <a
          href={'#'} // Make sure to define `linkedinUrl`
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin className="text-lg md:text-xl" />
        </a>
      </div>
    </div>
  )
}

export default ProfileCard