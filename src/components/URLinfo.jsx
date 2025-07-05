// src/components/URLInfo.jsx
import { useLocation } from 'react-router-dom';

export default function URLInfo() {
  const location = useLocation();
  return (
    <div className="url-info">
      (URL atual: {location.pathname})
    </div>
  );
}