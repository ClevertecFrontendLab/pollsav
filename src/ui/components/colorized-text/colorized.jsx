import s from './colorized.module.css';

export function ColorizedText({ text, search, direction }) {
  if (!search) {
    return (
      <p className={direction === 'row' ? s.card_name : s.card_name_cl}>
        <span>{text}</span>
      </p>
    );
  }
  const regex = new RegExp(`(${search})`, 'gi'); // создаем регулярное выражение для поиска совпадений
  const parts = text.split(regex); // разбиваем текст на части

  return (
    <p className={direction === 'row' ? s.card_name : s.card_name_cl}>
      {parts.map((part) =>
        regex.test(part) ? (
          <span style={{ color: '#FF5253' }} data-test-id='highlight-matches'>
            {part}
          </span>
        ) : (
          <span>{part}</span>
        )
      )}
    </p>
  );
}
