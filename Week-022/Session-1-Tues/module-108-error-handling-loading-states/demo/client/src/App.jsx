import { useState } from 'react';
import BasicExample from './examples/BasicExample';
import InlineLoadingExample from './examples/InlineLoadingExample';
import FormSubmissionExample from './examples/FormSubmissionExample';
import ErrorTypesExample from './examples/ErrorTypesExample';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Error Handling & Loading States</h1>
        <p>Comprehensive patterns for managing async operations in React</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={activeTab === 'basic' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('basic')}
        >
          Basic Pattern
        </button>
        <button
          className={activeTab === 'inline' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('inline')}
        >
          Inline Loading
        </button>
        <button
          className={activeTab === 'form' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('form')}
        >
          Form Submission
        </button>
        <button
          className={activeTab === 'errors' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('errors')}
        >
          Error Types
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'basic' && <BasicExample />}
        {activeTab === 'inline' && <InlineLoadingExample />}
        {activeTab === 'form' && <FormSubmissionExample />}
        {activeTab === 'errors' && <ErrorTypesExample />}
      </main>

      <footer className="app-footer">
        <p>All examples include loading states, error handling, and retry logic</p>
      </footer>
    </div>
  );
}

export default App;
