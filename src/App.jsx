import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import CityScene from './components/CityScene';
import './App.css';
import * as THREE from 'three';

/**
 * Componente para controlar el movimiento de la cámara basado en el scroll.
 * Realiza un desplazamiento en el eje Z y una leve rotación para dar dinamismo.
 */
const CameraFly = () => {
  const scroll = useScroll();
  useFrame((state) => {
    // Calcula la posición Z basada en el offset del scroll.
    // El factor 170 determina la profundidad total del viaje a través de la ciudad.
    const zPos = 20 - (scroll.offset * 170); 
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, zPos, 0.1);
    state.camera.rotation.z = scroll.offset * 0.1;
  });
  return null;
};

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} gl={{ antialias: true }}>
        
        {/* Configuración de Scroll: 'pages={6.1}' proporciona el espacio vertical necesario para la narrativa completa */}
        <ScrollControls pages={6.1} damping={0.3}>
          
          {/* --- Escena 3D de Fondo --- */}
          <CityScene />
          <CameraFly />

          {/* --- Capa de Interfaz (HTML) --- */}
          <Scroll html style={{ width: '100%' }}>
            
            {/* Contenedor Flex: Agrupa las secciones informativas */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '10vh' }}>
              
              {/* === SECCIÓN 1: PERFIL PROFESIONAL === */}
              <section className="section" style={{ height: 'auto', paddingBottom: '20px', justifyContent: 'flex-start' }}>
                <div className="hud-card">
                  <div className="scan-line"></div> 
                  
                  <div className="hud-header">
                    <span className="sys-status">● SYSTEM ONLINE</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>ID: AP-2025</span>
                  </div>

                  {/* Componente de Imagen Holográfica */}
                  <div className="holo-profile-container">
                    <div className="holo-ring-outer"></div>
                    <div className="holo-ring-inner"></div>
                    <div className="holo-profile">
                      <img src="/angelperfil.jpeg" alt="Profile" />
                      <div className="scan-overlay"></div>
                    </div>
                  </div>

                  <h1 style={{textAlign: 'center'}}>ANGEL HERNAN<br/><span>PATRICIO ARROYO</span></h1>
                  <h2 style={{textAlign: 'center', fontSize: '1rem'}}>INGENIERÍA DE SOFTWARE CON IA</h2>
                  
                  <p style={{ textAlign: 'center', fontSize: '1rem' }}>
                    Arquitecto de soluciones digitales especializado en Inteligencia Artificial y Calidad de Código. 
                    Transformando lógica compleja en software escalable.
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                    <a href="/CV_ANGEL_PATRICIO.pdf" target="_blank" className="cy-btn">
                      DESCARGAR DATOS (CV)
                    </a>
                  </div>
                </div>
              </section>

              {/* === SECCIÓN 2: EXPERIENCIA LABORAL === */}
              <section className="section" style={{ height: 'auto', paddingTop: '0', paddingBottom: '0', justifyContent: 'flex-end' }}>
                <div className="hud-card">
                  <div className="scan-line"></div>
                  <div className="hud-header">
                    <span className="sys-status">● LOGS DE OPERACIÓN</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>EXP_MODULE</span>
                  </div>

                  <div className="timeline-item">
                    <span className="timeline-date">ENE 2025 - JUL 2025</span>
                    <div className="timeline-role">PRACTICANTE DESARROLLO SOFTWARE</div>
                    <div className="timeline-company">COMPUTER PATRISOFT S.A.C.</div>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>
                      Despliegue de soluciones full-stack y mantenimiento preventivo de sistemas críticos. 
                      Optimización de flujos de trabajo mediante automatización.
                    </p>
                  </div>

                  <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }}/>

                  <h3 style={{ color: '#00ff88', fontSize: '1rem', marginBottom: '10px' }}>PROTOCOLOS SOCIALES (SOFT SKILLS)</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['Liderazgo Técnico', 'Scrum', 'Pensamiento Crítico', 'Adaptabilidad'].map(skill => (
                          <span key={skill} style={{ 
                             background: 'rgba(0, 255, 136, 0.1)', 
                             color: '#00ff88', 
                             padding: '4px 8px', 
                             fontSize: '0.8rem', 
                             border: '1px solid rgba(0, 255, 136, 0.3)' 
                          }}>
                              {skill}
                          </span>
                      ))}
                  </div>
                </div>
              </section>

              {/* === SECCIÓN 3: FORMACIÓN ACADÉMICA === */}
              <section className="section" style={{ height: 'auto', paddingTop: '20px', paddingBottom: '60vh', justifyContent: 'flex-start' }}>
                <div className="hud-card"> 
                  <div className="scan-line"></div>
                  <div className="hud-header">
                    <span className="sys-status">● BASE DE CONOCIMIENTO</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>EDU_DB</span>
                  </div>

                  <h2 style={{ marginBottom: '5px' }}>SENATI</h2>
                  <p style={{ color: '#00f0ff', fontSize: '0.9rem', marginBottom: '20px' }}>
                    2023 - 2025 | INGENIERÍA DE SOFTWARE CON IA
                  </p>

                  <h3 style={{ fontSize: '1rem', color: '#fff', borderLeft: '3px solid #00ff88', paddingLeft: '10px' }}>
                    CERTIFICACIONES ACTIVAS
                  </h3>
                  
                  <div className="tech-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="data-chip"><span className="chip-icon">☁</span> AWS Cloud Operations</div>
                    <div className="data-chip"><span className="chip-icon">🛡</span> Cisco Cybersecurity</div>
                    <div className="data-chip"><span className="chip-icon">☁</span> AWS Cloud Foundations</div>
                    <div className="data-chip" style={{ borderColor: '#00f0ff', color: '#00f0ff' }}>
                      <span className="chip-icon">🗣</span> English B1/B2
                    </div>
                    <div className="data-chip"><span className="chip-icon">📡</span> Cisco IoT Essentials</div>
                  </div>
                </div>
              </section>

            </div>

            {/* === SECCIÓN 4: VISUALIZACIÓN 3D (ARSENAL TÉCNICO) === */}
            <section className="section" style={{ pointerEvents: 'none', height: '150vh' }}>
            </section>

            {/* === SECCIÓN 5: CONTACTO === */}
            <section className="section" id="contact" style={{ justifyContent: 'center', marginTop: '20vh' }}>
              <div className="hud-card">
                <div className="scan-line"></div>
                <div className="hud-header">
                  <span className="sys-status" style={{ color: '#00f0ff' }}>● TRANSMISIÓN SEGURA</span>
                </div>
                
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>INICIAR ENLACE</h2>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
                  Respuesta estimada: &lt; 24 Horas
                </p>

                <form style={{ display: 'grid', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
                  <input className="cy-input" type="text" placeholder="IDENTIFICACIÓN (NOMBRE)" />
                  <input className="cy-input" type="email" placeholder="FRECUENCIA (EMAIL)" />
                  <textarea className="cy-input" style={{ height: '100px', resize: 'none' }} placeholder="MENSAJE CODIFICADO..."></textarea>
                  <button className="cy-btn" style={{ width:'100%', borderColor: '#00f0ff', color: '#00f0ff' }}>
                    EJECUTAR ENVÍO
                  </button>
                </form>
                
                {/* ICONOS SOCIALES LIMPIOS */}
                <div className="social-links">
                  <a href="https://github.com/AngelHer2005" target="_blank" rel="noreferrer" className="social-icon" aria-label="Github">
                    <GithubIcon />
                  </a>
                  <a href="https://linkedin.com/in/angelhernanpatricioarroyo" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            </section>

          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;

/* =========================================
   COMPONENTES DE ICONOS (SVG EXTRAÍDOS)
   ========================================= */

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);