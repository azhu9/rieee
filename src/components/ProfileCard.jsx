import {FaLinkedin } from 'react-icons/fa'
// eslint-disable-next-line react/prop-types
const ProfileCard = ({name, image, grade, role, linkedin, imageOffsetX = 0, imageOffsetY = 0}) => {
  return (
    <div className="w-full max-w-60 bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
      <img
        className="w-full aspect-square object-cover"
        src={image}
        alt={`${name}'s profile`}
        style={{aspectRatio: 1, objectPosition: `calc(50% + ${imageOffsetX}px) calc(50% + ${imageOffsetY}px)`}}
      />
      {/* <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full">
      <img
        src={image}
        alt="Profile"
        className="h-full w-auto"
      />
    </div> */}

      <div className="p-4 relative">
        <div className="min-h-[2.4em] flex items-center">
          <h2 className="font-geist md:text-xl sm:text-md font-semibold text-gray-800 leading-tight line-clamp-2">{name}</h2>
        </div>
        <div className="min-h-[2.4em] flex items-center">
          <p className="text-gray-600 md:text-md text-sm leading-tight line-clamp-2">{role}</p>
        </div>
        <div className="flex w-full">
          <p className="text-gray-600 md:text-md text-sm mt-1">{grade}</p>
        </div>

        {linkedin && (

        <a
          href={linkedin} // Make sure to define `linkedinUrl`
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin className="text-lg md:text-xl" />
        </a>
        )}
      </div>
    </div>
  )
}

export default ProfileCard