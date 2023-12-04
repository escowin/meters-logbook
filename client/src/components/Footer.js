function Footer(date) {
  const repo = "https://github.com/escowin/meters-logbook";

  return (
    <footer>
      <a href={repo} target="_blank" rel="noreferrer">&copy; {date.date} Edwin m. escobar</a>
    </footer>
  );
}

export default Footer;
