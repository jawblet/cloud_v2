import { useRef } from 'react';

export default function useScrollToBottom() {
    const scrollRef = useRef(null)

    const scrollToBottom = () => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    return {
        scrollRef, 
        scrollToBottom
    }
}