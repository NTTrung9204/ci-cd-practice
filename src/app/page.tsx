import Image from 'next/image';

export default function Page() {
  return (
    <>
      <h1>Welcome to My Profile</h1>
      <p>Hello, My name is Trung.</p>
      <p>This is deployment using CD github action page.</p>
      <Image src="/profile.png" alt="Profile" width={100} height={100} />;
    </>
  );
}
