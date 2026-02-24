import React from 'react';
import { Check } from 'lucide-react';

export const Checkbox = ({ checked, onCheckedChange, id, className = "" }) => {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            id={id}
            onClick={() => onCheckedChange?.(!checked)}
            className={`
                w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center
                ${checked
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-white border-slate-200 hover:border-primary/40'}
                ${className}
            `}
        >
            {checked && <Check size={14} strokeWidth={4} />}
        </button>
    );
};
