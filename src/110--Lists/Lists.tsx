

const Lists = () => {
  return (
    <article className="flex flex-col items-center mt-5">
        <section className="flex flex-col items-center gap-5">
      <h2 className="font-bold font-tertiary text-[1.2em]">Liste des camionneurs disponibles:</h2>
      <ul className="flex flex-col"></ul>
      </section>
      <section className="flex flex-col items-center">
        <h2 className="font-bold font-tertiary text-[1.2em]">Liste des travailleurs en congé:</h2>
        <ul className="flex flex-col"></ul>
      </section>

    </article>
  )
}

export default Lists
