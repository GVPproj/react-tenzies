export default function Info() {
  return (
    <section className="info">
      <h1 className="title">About</h1>
      <p>
        This project, my first React app, is based on the Tenzies app from Bob
        Ziroll's Scrimba React Course.
      </p>
      <p>
        Ziroll's basic gameplay and design is intact here, but I have added{" "}
        <strong>Scoring</strong> functionality by counting dice-rolls as well as
        seconds-to-completion with a proprietary <strong>Timer</strong>. The
        user's low score <strong>persists</strong> in their browser's <em>local storage</em> for later
        sessions.
      </p>
      <p>
        I also personalized the <strong>styling</strong> somewhat.
      </p>
    </section>
  )
}
