import React from 'react';
import type { Grade } from '../../types';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../../constants/school';
import { GRADES_INFO } from '../../utils/gradeAdapter';
import { Byte } from './Byte';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PrintableLabDiplomaProps {
  studentName: string;
  grade: Grade;
}

export const PrintableLabDiploma: React.FC<PrintableLabDiplomaProps> = ({
  studentName,
  grade,
}) => {
  const gradeInfo = GRADES_INFO[grade];
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="diploma-print-sheet"
      style={{
        width: '190mm',
        height: '277mm',
        maxWidth: '190mm',
        maxHeight: '277mm',
        boxSizing: 'border-box',
        margin: '0 auto',
        padding: '6mm 8mm',
        backgroundColor: '#fffdf5',
        color: '#0f172a',
        border: '4px double #d97706',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Decorative Golden Corner Stars */}
      <div className="absolute top-2 left-3 text-lg select-none text-amber-500">⭐</div>
      <div className="absolute top-2 right-3 text-lg select-none text-amber-500">⭐</div>
      <div className="absolute bottom-2 left-3 text-lg select-none text-amber-500">⭐</div>
      <div className="absolute bottom-2 right-3 text-lg select-none text-amber-500">⭐</div>

      {/* Inner Decorative Dashed Border Frame */}
      <div
        className="h-full w-full flex flex-col justify-between"
        style={{
          border: '2px dashed rgba(217, 119, 6, 0.45)',
          borderRadius: '12px',
          padding: '6mm 7mm',
          boxSizing: 'border-box',
        }}
      >
        {/* 1. Header: School Logo & Institutional Presentation */}
        <div className="text-center flex flex-col items-center">
          {/* Institutional School Logo */}
          <div className="flex flex-col items-center mb-1">
            <img
              src={SCHOOL_LOGO}
              alt={SCHOOL_NAME}
              style={{
                height: '19mm',
                maxHeight: '19mm',
                width: 'auto',
                maxWidth: '65mm',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <span
              style={{
                fontSize: '9.5pt',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1e1b4b',
                marginTop: '1.5mm',
              }}
            >
              {SCHOOL_NAME}
            </span>
          </div>

          {/* Honor Ribbon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#fef3c7',
              color: '#78350f',
              border: '1px solid #f59e0b',
              borderRadius: '9999px',
              padding: '1.5px 12px',
              fontSize: '7.5pt',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '1.5mm 0',
            }}
          >
            <Award style={{ width: '12px', height: '12px' }} />
            <span>GUARDIANES DE LA SALA • RECONOCIMIENTO DE HONOR</span>
            <Award style={{ width: '12px', height: '12px' }} />
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '18pt',
              fontWeight: 900,
              color: '#1e1b4b',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              margin: '1mm 0 0.5mm 0',
              lineHeight: 1.15,
            }}
          >
            GUARDIÁN DE LA SALA DE INFORMÁTICA
          </h1>

          <p
            style={{
              fontSize: '8pt',
              fontWeight: 700,
              color: '#92400e',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              margin: 0,
            }}
          >
            Uso Responsable, Cuidado y Seguridad de los Recursos Tecnológicos
          </p>
        </div>

        {/* 2. Recipient Section */}
        <div className="text-center my-1">
          <p
            style={{
              fontSize: '9pt',
              fontWeight: 800,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 2.5mm 0',
            }}
          >
            Se reconoce con orgullo y distinción a:
          </p>

          <div
            style={{
              fontSize: '24pt',
              fontWeight: 900,
              color: '#3730a3',
              letterSpacing: '0.04em',
              borderBottom: '3.5px solid #f59e0b',
              display: 'inline-block',
              padding: '0 28px 2.5mm 28px',
              margin: '0 auto 3mm auto',
              lineHeight: 1.1,
            }}
          >
            {studentName.toUpperCase()}
          </div>

          <p
            style={{
              fontSize: '12pt',
              fontWeight: 900,
              color: '#1e293b',
              margin: '0 0 2.5mm 0',
            }}
          >
            Alumno/a de {gradeInfo.name.toUpperCase()} • {gradeInfo.badgeName.toUpperCase()}
          </p>

          <p
            style={{
              fontSize: '9.5pt',
              fontWeight: 500,
              fontStyle: 'italic',
              color: '#334155',
              maxWidth: '150mm',
              margin: '0 auto',
              lineHeight: 1.4,
            }}
          >
            "Por haber completado satisfactoriamente la aventura sobre el uso responsable,
            cuidado y seguridad de los recursos tecnológicos, demostrando excelencia en el cuidado
            de los equipos, respeto mutuo, orden, seguridad eléctrica y ciudadanía digital."
          </p>
        </div>

        {/* 3. Achievements Summary Row */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1.5px solid #fcd34d',
            borderRadius: '12px',
            padding: '2.5mm 6mm',
            maxWidth: '145mm',
            margin: '1.5mm auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ fontSize: '13pt', display: 'block', lineHeight: 1 }}>🌳</span>
            <span style={{ fontSize: '9.5pt', fontWeight: 900, color: '#047857' }}>7 / 7</span>
            <span style={{ fontSize: '6.5pt', fontWeight: 700, color: '#64748b', display: 'block', textTransform: 'uppercase' }}>
              Mundos
            </span>
          </div>

          <div style={{ width: '1px', height: '8mm', backgroundColor: '#fde68a' }} />

          <div>
            <span style={{ fontSize: '13pt', display: 'block', lineHeight: 1 }}>🏅</span>
            <span style={{ fontSize: '9.5pt', fontWeight: 900, color: '#92400e' }}>7 / 7</span>
            <span style={{ fontSize: '6.5pt', fontWeight: 700, color: '#64748b', display: 'block', textTransform: 'uppercase' }}>
              Insignias
            </span>
          </div>

          <div style={{ width: '1px', height: '8mm', backgroundColor: '#fde68a' }} />

          <div>
            <span style={{ fontSize: '13pt', display: 'block', lineHeight: 1 }}>⭐</span>
            <span style={{ fontSize: '9.5pt', fontWeight: 900, color: '#047857' }}>10 / 10</span>
            <span style={{ fontSize: '6.5pt', fontWeight: 700, color: '#64748b', display: 'block', textTransform: 'uppercase' }}>
              Evaluación
            </span>
          </div>

          <div style={{ width: '1px', height: '8mm', backgroundColor: '#fde68a' }} />

          <div>
            <span style={{ fontSize: '13pt', display: 'block', lineHeight: 1 }}>🏆</span>
            <span style={{ fontSize: '9.5pt', fontWeight: 900, color: '#4338ca' }}>GUARDIÁN</span>
            <span style={{ fontSize: '6.5pt', fontWeight: 700, color: '#64748b', display: 'block', textTransform: 'uppercase' }}>
              Oficial
            </span>
          </div>
        </div>

        {/* 4. Official Signatures and Seals */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8mm',
            paddingTop: '3mm',
            borderTop: '1.5px solid #e2e8f0',
            marginTop: '1.5mm',
          }}
        >
          {/* Seal 1: School Official Seal */}
          <div className="flex flex-col items-center text-center">
            <div
              style={{
                width: '13mm',
                height: '13mm',
                borderRadius: '9999px',
                border: '2.5px solid #f59e0b',
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1mm',
                position: 'relative',
              }}
            >
              <ShieldCheck style={{ width: '7mm', height: '7mm', color: '#d97706' }} />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2mm',
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  fontSize: '5.5pt',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '0.5px 4px',
                  borderRadius: '9999px',
                  lineHeight: 1.2,
                }}
              >
                OFICIAL
              </span>
            </div>
            <div style={{ width: '28mm', borderBottom: '1.5px solid #94a3b8', margin: '1.5mm 0 1mm 0' }} />
            <span style={{ fontSize: '7.5pt', fontWeight: 900, color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
              Sello Institucional
            </span>
            <span style={{ fontSize: '6.5pt', fontWeight: 600, color: '#64748b', display: 'block' }}>
              Fecha: {currentDate}
            </span>
          </div>

          {/* Seal 2: Clasito Mascot Approved */}
          <div className="flex flex-col items-center text-center">
            <div
              style={{
                width: '13mm',
                height: '13mm',
                borderRadius: '9999px',
                border: '2.5px solid #10b981',
                backgroundColor: '#d1fae5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1mm',
                position: 'relative',
              }}
            >
              <div style={{ transform: 'scale(0.55)', transformOrigin: 'center' }}>
                <Byte mood="victoria" size="sm" worldId={7} interactive={false} showSpeaker={false} />
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2mm',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontSize: '5.5pt',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '0.5px 4px',
                  borderRadius: '9999px',
                  lineHeight: 1.2,
                }}
              >
                BYTE APROBÓ
              </span>
            </div>
            <div style={{ width: '28mm', borderBottom: '1.5px solid #94a3b8', margin: '1.5mm 0 1mm 0' }} />
            <span style={{ fontSize: '7.5pt', fontWeight: 900, color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
              Byte el Guardián
            </span>
            <span style={{ fontSize: '6.5pt', fontWeight: 600, color: '#64748b', display: 'block' }}>
              Compañero de Misión
            </span>
          </div>

          {/* Seal 3: School Direction / Teaching Team */}
          <div className="flex flex-col items-center text-center">
            <div
              style={{
                width: '13mm',
                height: '13mm',
                borderRadius: '9999px',
                border: '2.5px solid #10b981',
                backgroundColor: '#d1fae5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1mm',
                position: 'relative',
              }}
            >
              <CheckCircle2 style={{ width: '7mm', height: '7mm', color: '#059669' }} />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2mm',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontSize: '5.5pt',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '0.5px 4px',
                  borderRadius: '9999px',
                  lineHeight: 1.2,
                }}
              >
                VALIDADO
              </span>
            </div>
            <div style={{ width: '28mm', borderBottom: '1.5px solid #94a3b8', margin: '1.5mm 0 1mm 0' }} />
            <span style={{ fontSize: '7.5pt', fontWeight: 900, color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
              Equipo Docente
            </span>
            <span style={{ fontSize: '6.5pt', fontWeight: 600, color: '#64748b', display: 'block' }}>
              {SCHOOL_NAME}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
