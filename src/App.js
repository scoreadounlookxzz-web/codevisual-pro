import React, { useState } from 'react';
import { OtherIcon } from 'react-bootstrap-icons';

const CodeVisualizerPlatform = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [pythonCode, setPythonCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [pythonOutput, setPythonOutput] = useState('');
  const [showPythonPreview, setShowPythonPreview] = useState(false);

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setShowWelcome(false);
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
    setLoginForm({ email: '', password: '' });
    setShowWelcome(true);
  };

  const executePythonCode = () => {
    if (!pythonCode.trim()) {
      setPythonOutput('');
      setShowPythonPreview(false);
      return;
    }

    try {
      let output = '';
      const printMatches = [...pythonCode.matchAll(/print\s*\(\s*['"](.+?)['"]\s*\)/g)];
      if (printMatches.length > 0) {
        output = printMatches.map(match => match[1]).join('\n');
      } else if (pythonCode.toLowerCase().includes('tkinter')) {
        output = `
          <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#e2e8f0;">
            <div style="background:white;border:2px solid #94a3b8;border-radius:10px;padding:40px;text-align:center;box-shadow:0 0 20px rgba(0,0,0,0.1);">
              <h2 style="color:#1e293b;font-size:1.5rem;">🪟 Simulación Tkinter</h2>
              <p style="color:#475569;">Tu aplicación gráfica aparecería aquí.</p>
            </div>
          </div>
        `;
      } else {
        output = '# Código Python ejecutado\n' + pythonCode;
      }
      setPythonOutput(output);
      setShowPythonPreview(true);
    } catch (error) {
      setPythonOutput('Error: ' + error.message);
      setShowPythonPreview(true);
    }
  };

  if (showWelcome && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-12 w-full max-w-2xl relative z-10 backdrop-blur-sm text-center">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/50 mx-auto">
            <Code className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            CodeVisual Pro
          </h1>
          <p className="text-slate-400 text-lg mb-8">La plataforma de desarrollo con vista previa en tiempo real.</p>
          <button
            onClick={() => setShowWelcome(false)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl -bottom-20 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/50">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              CodeVisual Pro
            </h1>
            <p className="text-slate-400 text-lg">Desarrolla con el poder de la IA</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-500"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 mt-6"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400">
              🚀 Demo: Usa cualquier email y contraseña
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
        <header className="bg-slate-900 border-b border-slate-700 shadow-xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/50">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  CodeVisual Pro
                </h1>
                <p className="text-xs text-slate-400">Plataforma de Desarrollo Inteligente</p>
              </div>
            </div>
            <div>
              <button onClick={handleLogout} className="flex items-center space-x-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline font-medium">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-5xl w-full text-center">
            <h2 className="text-4xl font-bold text-slate-200 mb-4">
              Selecciona tu entorno de desarrollo
            </h2>
            <p className="text-slate-400 text-lg mb-12">
              Elige el lenguaje con el que deseas trabajar
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => setCurrentView('python')} className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                <div className="text-6xl mb-4">🐍</div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">Python</h3>
                <p className="text-slate-400 mb-4">Ejecuta código Python y visualiza resultados</p>
              </button>

              <button onClick={() => setCurrentView('web')} className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                <div className="text-6xl mb-4">🌐</div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">HTML/CSS/JS</h3>
                <p className="text-slate-400 mb-4">Desarrolla páginas web con vista previa</p>
              </button>

              <button onClick={() => setCurrentView('ai')} className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-slate-200 mb-3">Generador IA</h3>
                <p className="text-slate-400 mb-4">Genera código automáticamente con IA</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'python') {
    return (
      <div className="h-screen bg-slate-950 flex flex-col">
        <div className="bg-slate-900 border-b border-slate-700 px-4 py-2 flex justify-between">
          <button onClick={() => setCurrentView('home')} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700">
            <Home className="w-4 h-4 inline-block mr-1" /> Inicio
          </button>
          <button onClick={executePythonCode} className="px-4 py-1.5 bg-green-600 rounded-lg text-white hover:bg-green-700">
            <Play className="w-4 h-4 inline-block mr-1" /> Ejecutar
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 bg-slate-950 border-r border-slate-800">
            <textarea
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              placeholder="# Escribe tu código Python aquí"
              className="w-full h-full px-4 py-3 bg-slate-950 text-slate-200 font-mono text-sm outline-none resize-none"
            />
          </div>

          <div className="w-1/2 flex flex-col" style={{ background: 'linear-gradient(to bottom, #0f172a 50%, #ffffff 50%)' }}>
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-slate-400">
              <Terminal className="w-4 h-4 inline-block mr-1" /> Salida
            </div>
            <div className="flex-1 overflow-auto p-4">
              {showPythonPreview && pythonOutput ? (
                pythonOutput.includes('<div') ? <div dangerouslySetInnerHTML={{ __html: pythonOutput }} /> : <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{pythonOutput}</pre>
              ) : (
                <div className="text-slate-500 text-center mt-20">
                  <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Ejecuta tu código para ver la salida</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'web') {
    return (
      <div className="h-screen bg-slate-950 flex flex-col">
        <div className="bg-slate-900 border-b border-slate-700 px-4 py-2 flex justify-between">
          <button onClick={() => setCurrentView('home')} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700">
            <Home className="w-4 h-4 inline-block mr-1" /> Inicio
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 bg-slate-950 border-r border-slate-800 flex flex-col">
            <textarea
              placeholder="<h1>Hola Mundo</h1>"
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-950 text-slate-200 font-mono text-sm outline-none resize-none"
            />
            <textarea
              placeholder="body { margin: 0; background: lightblue; }"
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-950 text-blue-400 font-mono text-sm outline-none resize-none"
            />
            <textarea
              placeholder="console.log('Hola');"
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-950 text-yellow-400 font-mono text-sm outline-none resize-none"
            />
          </div>

          <iframe
            srcDoc={`<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`}
            title="Vista Previa"
            className="w-1/2 bg-white"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default CodeVisualizerPlatform;
