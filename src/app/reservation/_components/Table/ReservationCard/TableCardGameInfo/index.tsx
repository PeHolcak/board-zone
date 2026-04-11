import { gameName, inlineInfoRow } from "./styles"

interface TableCardGameInfoProps {
  gameNameText?: string
}

export const TableCardGameInfo = ({
  gameNameText,
}: TableCardGameInfoProps) => {
  if (!gameNameText) return null

  return (
    <div className={inlineInfoRow}>
      <p className={gameName}>Název hry: {gameNameText}</p>
    </div>
  )
}