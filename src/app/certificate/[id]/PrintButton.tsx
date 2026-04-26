"use client";

export default function PrintButton() {
  return (
    <button 
      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition-colors"
      onClick={() => window.print()}
    >
      PDF로 저장하기
    </button>
  );
}
