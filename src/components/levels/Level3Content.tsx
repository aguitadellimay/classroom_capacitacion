import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import {
  BookOpen,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface Level3ContentProps {
  grade: Grade;
  onNext: () => void;
}

interface SectionInfo {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
  shortDescG1: string;
}

export const Level3Content: React.FC<Level3ContentProps> = ({ grade, onNext }) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'classwork'>('stream');
  const [explored, setExplored] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionInfo | null>(null);

  const sections: SectionInfo[] = [
    {
      id: 'stream_header',
      name: 'Novedades / Tablón',
      tag: '📢 Cartelera escolar',
      icon: '📢',
      description:
        'Es el muro principal de la clase. Acá tu docente publica los avisos importantes del día, saludos y recordatorios para todo el curso.',
      shortDescG1: '¡AVISOS Y MENSAJES DE LA SEÑO PARA TODOS!',
    },
    {
      id: 'classwork_tab',
      name: 'Trabajo de clase',
      tag: '📚 Donde están las materias',
      icon: '📚',
      description:
        '¡La sección más importante! Acá están organizadas todas tus materias, tareas para hacer, videos y materiales de lectura.',
      shortDescG1: '¡AQUÍ ESTÁN TODAS TUS TAREAS Y MATERIAS!',
    },
    {
      id: 'assignment_card',
      name: 'Tarea con entrega',
      tag: '📝 Actividad para realizar',
      icon: '📝',
      description:
        'Al hacer clic en una tarea, podés leer las instrucciones completas, ver la fecha límite y el botón para adjuntar tu trabajo.',
      shortDescG1: '¡HACÉ CLIC PARA ABRIR Y HACER TU TAREA!',
    },
    {
      id: 'material_card',
      name: 'Material de lectura',
      tag: '📖 Libros y videos',
      icon: '📖',
      description:
        'Son lecturas, imágenes o videos que el profesor comparte para estudiar o repasar. No requieren entregar un archivo.',
      shortDescG1: '¡LECTURAS Y VIDEOS LINDOS PARA MIRAR!',
    },
    {
      id: 'comments_box',
      name: 'Comentarios de clase',
      tag: '💬 Dudas y consultas',
      icon: '💬',
      description:
        'Podés escribir preguntas respetuosas si no entendés algo del ejercicio. Tu maestro y tus compañeros podrán leerlo y ayudarte.',
      shortDescG1: '¡ESCRIBÍ TUS DUDAS CON PALABRAS AMABLES!',
    },
  ];

  const handleExplore = (section: SectionInfo) => {
    soundManager.playClick();
    setSelectedSection(section);
    if (!explored.includes(section.id)) {
      const next = [...explored, section.id];
      setExplored(next);
      soundManager.playStarSparkle();
      if (next.length === sections.length) {
        soundManager.playLevelComplete();
      }
    }
  };

  const isAllExplored = explored.length === sections.length;

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-emerald-50 border-3 border-emerald-300 p-4 rounded-3xl">
        <Clasito
          mood={isAllExplored ? 'celebrating' : 'motivating'}
          size="md"
          speechText={
            grade === 1
              ? '¡EXPLORÁ EL AULA! TOCÁ CADA ZONA PARA DESCUBRIR QUÉ ES.'
              : '¡Esta es una simulación de Classroom! Hace clic en las zonas brillantes para explorarla.'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
            {formatGradeText('Simulador Interactivo de Classroom', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-emerald-800 mt-1">
            {formatGradeText(
              `Exploraste ${explored.length} de ${sections.length} zonas importantes.`,
              grade
            )}
          </p>
          <div className="w-full bg-emerald-200 h-2.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(explored.length / sections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Simulated Google Classroom UI */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl overflow-hidden shadow-lg">
        {/* Fake Classroom Top Navigation */}
        <div className="bg-emerald-700 text-white p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-lg">
              🏫
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg leading-tight">
                AULA DE PRIMARIA — CON CLASITO
              </h4>
              <p className="text-xs text-emerald-200">Ciclo Escolar Activo</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-emerald-800/60 p-1 rounded-xl text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'stream' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Novedades
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('classwork')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'classwork' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Trabajo de clase
            </button>
          </div>
        </div>

        {/* Tab Content 1: Novedades / Stream */}
        {activeTab === 'stream' ? (
          <div className="p-4 sm:p-6 bg-slate-100 space-y-4">
            {/* Banner element */}
            <div
              onClick={() => handleExplore(sections[0])}
              className={`relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-2xl cursor-pointer transition-all hover:scale-101 border-3 ${
                explored.includes('stream_header') ? 'border-emerald-300' : 'border-amber-400 animate-pulse-glow'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider inline-block mb-1">
                    Zona 1: Novedades
                  </span>
                  <h5 className="text-xl sm:text-2xl font-black">Ciencias y Lengua - 2026</h5>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                    ¡Bienvenidos aventureros al aula virtual!
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-xl shadow">
                  {explored.includes('stream_header') ? '✅' : '👆'}
                </div>
              </div>
            </div>

            {/* Announcement post */}
            <div
              onClick={() => handleExplore(sections[4])}
              className={`bg-white p-4 rounded-2xl border-3 transition-all cursor-pointer hover:border-emerald-400 ${
                explored.includes('comments_box') ? 'border-slate-200' : 'border-amber-400 animate-pulse-glow'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs">
                  Profe
                </div>
                <div>
                  <span className="font-extrabold text-sm text-slate-800">Seño Laura</span>
                  <span className="text-xs text-slate-400 ml-2">Publicado hoy</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 font-medium">
                "¡Hola chicos! Ya subí la actividad de los seres vivos en Trabajo de clase. ¡Recuerden leer bien la consigna!"
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                <MessageSquare className="w-4 h-4" />
                <span>Comentarios de la clase (Toca aquí para ver cómo comentar con respeto)</span>
                {explored.includes('comments_box') && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
              </div>
            </div>

            {/* Switch to Classwork prompt */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('classwork');
                  handleExplore(sections[1]);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm inline-flex items-center gap-2 cursor-pointer shadow"
              >
                <span>Ir a la pestaña "Trabajo de clase" 📚</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Tab Content 2: Trabajo de clase */
          <div className="p-4 sm:p-6 bg-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <h5 className="font-black text-slate-800 text-lg">Unidad 1: Los animales y la naturaleza</h5>
              </div>
              <span className="text-xs font-bold text-slate-500">2 temas activos</span>
            </div>

            {/* Assignment Card */}
            <div
              onClick={() => handleExplore(sections[2])}
              className={`bg-white p-4 rounded-2xl border-3 transition-all cursor-pointer hover:border-emerald-400 ${
                explored.includes('assignment_card') ? 'border-slate-200' : 'border-amber-400 animate-pulse-glow'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl flex-shrink-0">
                    📋
                  </div>
                  <div>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      Tarea con entrega
                    </span>
                    <h6 className="font-extrabold text-base text-slate-900 mt-0.5">
                      Tarea: Mi animal favorito
                    </h6>
                    <p className="text-xs text-slate-500 font-semibold">Fecha límite: Viernes, 18:00 hs</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {explored.includes('assignment_card') ? (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg">
                      ¡Explorado! ✅
                    </span>
                  ) : (
                    <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-1 rounded-lg animate-bounce">
                      ¡Toca aquí! 👆
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Material Card */}
            <div
              onClick={() => handleExplore(sections[3])}
              className={`bg-white p-4 rounded-2xl border-3 transition-all cursor-pointer hover:border-emerald-400 ${
                explored.includes('material_card') ? 'border-slate-200' : 'border-amber-400 animate-pulse-glow'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl flex-shrink-0">
                    📖
                  </div>
                  <div>
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      Material de lectura
                    </span>
                    <h6 className="font-extrabold text-base text-slate-900 mt-0.5">
                      Ficha informativa: Animales vertebrados
                    </h6>
                    <p className="text-xs text-slate-500 font-semibold">Lectura para consultar (sin entrega)</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {explored.includes('material_card') ? (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg">
                      ¡Explorado! ✅
                    </span>
                  ) : (
                    <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-1 rounded-lg animate-bounce">
                      ¡Toca aquí! 👆
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail explanation modal/card if an area is selected */}
      {selectedSection && (
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-5 animate-pop-in shadow-md">
          <div className="flex items-start gap-3">
            <span className="text-3xl sm:text-4xl flex-shrink-0">{selectedSection.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-lg sm:text-xl text-emerald-950">
                  {formatGradeText(selectedSection.name, grade)}
                </h4>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                  {selectedSection.tag}
                </span>
              </div>
              <p
                className={`font-semibold text-emerald-900 mt-2 leading-relaxed ${
                  grade === 1 ? 'text-base sm:text-lg font-bold' : 'text-sm sm:text-base'
                }`}
              >
                {grade === 1
                  ? formatGradeText(selectedSection.shortDescG1, grade)
                  : selectedSection.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Button to proceed */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isAllExplored
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <span>{formatGradeText(isAllExplored ? '¡IR AL MINI DESAFÍO! ⭐' : 'CONTINUAR AL DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
