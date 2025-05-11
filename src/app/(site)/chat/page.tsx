import ChatApp from '@/components/Chat';


interface Props {
  searchParams: { userId?: string; itemId?: string };
}


export default function ChatPage({ searchParams }: Props) {
  const { userId, itemId } = searchParams;
  return(
    <> 
    <ChatApp receiverId={userId} item={itemId} />
    </>
  ); 
  
}
