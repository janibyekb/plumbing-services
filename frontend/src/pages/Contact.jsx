export default function Contact() {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact</h2>
        <p className="mb-6  font-light text-center text__para">
          Got a technical issue? Want to send feedback about our application?
          Let us know
        </p>

        <form action="" className="space-y-8">
          <div>
            <label className="form__label" htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form__input mt-1 rounded-md"
            />
          </div>
          <div>
            <label className="form__label" htmlFor="message">
              Your message
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              placeholder="Leave a comment"
              className="form__input mt-1 "
            />
          </div>

          <button className="btn rounded sm:w-fit">Submit</button>
        </form>
      </div>
    </section>
  );
}
