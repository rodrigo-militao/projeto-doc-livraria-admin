import React, { useState, useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

import './assets/main.scss';

import { getGroups, saveNewGroup, saveNewArticle } from './api';

function App() {
  const [inputMd, setInputMd] = useState("");
  const [url, setUrl] = useState("");
  const [group, setGroup] = useState("");
  const [newGroupOrder, setNewGroupOrder] = useState(0);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");

  const [groups, setGroups] = useState([]);
  const [addNewGroup, setAddNewGroup] = useState(false);
  const [addNewGroupLoading, setAddNewGroupLoading] = useState(false);
  const [newGroup, setNewGroup] = useState("");

  const [addNewArticleLoading, setAddNewArticleLoading] = useState(false);

  const handleInputMdChange = (e) => {
    setInputMd(e.target.value);
  }

  const handleAddNewGroup = () => {
    setAddNewGroup(true);
  }
  
  const resetForm = () => {
    setInputMd("");
    setUrl("");
    setGroup("");
    setTitle("");
    setOrder("");
  }

  const handleSaveArticle = async () => {
    setAddNewArticleLoading(true);
    const article = {
      url,
      group,
      groupOrder: newGroupOrder,
      title,
      content: inputMd,
      order
    }
    await saveNewArticle(article);
    setAddNewArticleLoading(false);
    resetForm();
  }

  const handleSaveNewGroup = async () => {
    setAddNewGroupLoading(true);
    const newGroupData = {
      title: newGroup,
      order: 0
    }
    await saveNewGroup(newGroupData);

    setGroups(prev => [...prev, newGroupData]);

    setAddNewGroup(false);
    setNewGroup("");
    setAddNewGroupLoading(false);
  }

  useEffect(() => {
    getGroups().then(setGroups);
  }, []);

  useEffect(() => {
    console.log(groups)
    console.log(group)
  }, [groups]);


  return (
    <div className="main">
      <div className="left-div">

        <div>
          <div>
            <label id="input_title_label" htmlFor="input_title">Titulo</label>
          </div>
            <input id="input_title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <div>
            <label id="input_url_label" htmlFor="input_url">Url</label>
          </div>
            <input id="input_url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
      
        <div>
            {
              !addNewGroup ?
              <>
                <div>
                  <label id="input_group_label" htmlFor="input_group">Grupo</label>
                  <a id="btn_new_group" href="#" onClick={handleAddNewGroup}>Novo grupo</a>
                </div>
                <select id="input_group" value={group} onChange={(e) => setGroup(e.target.value)}>
                  <option value="">Selecione</option>
                  {
                    groups.length > 0 && groups.map((group, index) => {
                      return <option key={index} value={group.id}>{group.title}</option>
                    })
                  }
                </select>
              </>
                :
                <>
                  <div>
                    <label id="input_new_group_label" htmlFor="input_new_group">Novo grupo</label>
                  </div>
                  <div>
                    <input id="input_new_group" type="text" value={newGroup} onChange={(e) => setNewGroup(e.target.value)} />
                  </div>
                  <div>
                    <label id="input_new_group_order_label" htmlFor="input_new_group_order">Ordem do grupo</label>
                  </div>
                  <div>
                    <input id="input_new_group_order" type="number" value={newGroupOrder} onChange={(e) => setNewGroupOrder(e.target.value)} />
                  </div>
                  
                    <button className="btn" disabled={addNewGroupLoading} onClick={handleSaveNewGroup}>Salvar Grupo</button>
                    <button className="btn" disabled={addNewGroupLoading} onClick={() => setAddNewGroup(false)}>Cancelar</button>
                </>
            }
            
        </div>

        <div>
          <div>
            <label id="input_order_label" htmlFor="input_order">Order</label>
          </div>
            <input id="input_order" type="number" min="0" value={order} onChange={(e) => setOrder(e.target.value)} />
        </div>

        <div>
          <div>
            <label id="input_md_label" htmlFor="input_md">Markdown</label>
          </div>
            <textarea 
              id="input_md"
              placeholder=""
              value={inputMd}
              onChange={handleInputMdChange}
              rows="25" 
              cols="60"
            >
            </textarea>
        </div>
        
        <button 
          id="save_new_article" 
          onClick={handleSaveArticle}
          className="btn btn_save"
          //disabled={addNewArticleLoading}
        >
          Salvar
        </button>

      </div>
      <div className="right-div">
        <h2 className="text-center" >Preview</h2>
        <MarkdownPreview source={inputMd} />
      </div>
    </div>
  );
}

export default App;
