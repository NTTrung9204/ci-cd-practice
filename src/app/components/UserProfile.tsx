// import Image from 'next/image';

interface UserProfileProps {
  name: string;
  role: string;
  imageUrl?: string;
}

export default function UserProfile({
  name,
  role,
  imageUrl = '/profile.png',
}: UserProfileProps) {
  const a = 10;
  console.log(imageUrl, a);
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100">
      {/* <Image
        src={imageUrl}
        alt={`${name}'s profile`}
        width={64}
        height={64}
        className="rounded-full"
      /> */}
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
}
