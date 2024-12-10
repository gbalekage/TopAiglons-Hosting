import React, { useEffect } from 'react'

const ErrorPage = () => {
  useEffect(() => {
    document.title = `404 - Erreur`;
  }, []);
  return (
    <div>ErrorPage</div>
  )
}

export default ErrorPage