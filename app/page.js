import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col gap-4 items-center justify-center py-8">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold">Get me a chai</h1>
            <Image
              src="/Images/tea.gif"
              height={100}
              width={100}
              alt="Picture of the author"
              className="invert-[0.25]"
            />
          </div>
          <p>A crowdfunding platform for creators to fund their projects.</p>
          <p>A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.</p>
          <div className="buttons">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </div>
        </div>

        <div className="line h-1 bg-[#64748b5c]"></div>

        <div className="flex flex-col gap-12 items-center justify-center py-14 pb-24">
          <h2 className="text-3xl font-bold">Your Fans can buy you a Chai</h2>

          <div className="flex gap-24">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/Images/man.gif"
                height={90}
                width={90}
                alt="Picture of the man"
                className="bg-slate-500 rounded-full p-4"
              />
              <h3 className="font-semibold">Fans want to help</h3>
              <p>Your fans are available to support you</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/Images/coin.gif"
                height={90}
                width={90}
                alt="Picture of the man"
                className="bg-slate-500 rounded-full p-4"
              />
              <h3 className="font-semibold">Fans want to contribute</h3>
              <p>Your fans are willing to contribute financially</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/Images/group.gif"
                height={90}
                width={90}
                alt="Picture of the man"
                className="bg-slate-500 rounded-full p-4"
              />
              <h3 className="font-semibold">Fans want to collaborate</h3>
              <p>Your fans are ready to collaborate with you</p>
            </div>
          </div>
        </div>

        <div className="line h-1 bg-[#64748b5c]"></div>

        <div className="flex flex-col gap-12 items-center justify-center py-14 pb-24">
          <h2 className="text-3xl font-bold">Learn more about us</h2>

          <iframe width="560" height="250" 
            src="https://www.youtube.com/embed/ojuUnfqnUI0?si=Gdx_ykZA1YF0ofNi" 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
        </div>
      </main>
    </>
  );
}
