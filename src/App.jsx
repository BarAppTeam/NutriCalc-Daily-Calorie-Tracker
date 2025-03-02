import React, { useState, useEffect } from 'react';
import { Layout, Space, Button, Select } from 'antd';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import TotalCalories from './components/calories/TotalCalories';
import logo from "./assets/logo.jpeg"
import './styles/App.css';
import './styles/antd-custom.css';

const { Header, Content, Footer } = Layout;

function AppContent() {
  const { translate, language, changeLanguage } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products from localStorage on initial load
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    // Update localStorage when products change
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addOrUpdateProduct = (product) => {
    const existingIndex = products.findIndex(p => p.productId === product.productId);
    if (existingIndex > -1) {
      // Update existing product
      const updatedProducts = [...products];
      updatedProducts[existingIndex] = product;
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts([...products, { ...product, productId: Date.now() }]);
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.productId !== productId));
  };

  const shareSummary = () => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let summary = 'Product Calorie Summary:\n';
    products.forEach(product => {
      summary += `${product.productName}: ${product.productAmount} kg - ${product.totalCalories} calories (total)\n`;
    });
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
  }

  const clearAllProducts = () => {
    setProducts([]);
  }

  return (
    <Layout className="App">
      <Header className="app-title">
        <Space>
          <img src={logo} alt="NutriCalc Logo" className="app-logo" />
          <h1>{translate('app.title')}</h1>
          <Select
            value={language}
            onChange={changeLanguage}
            style={{ width: 120, marginLeft: 16 }}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="he">עברית</Select.Option>
          </Select>
        </Space>
      </Header>
      <Content className="app-content">
        <ProductForm onAdd={addOrUpdateProduct} />
        <ProductList products={products} onEdit={addOrUpdateProduct} onDelete={deleteProduct} />
        {products.length > 0 && <TotalCalories products={products} />}
        
        <Space className="app-actions">
          <Button 
            type="primary" 
            id="shareSummary" 
            disabled={!products.length} 
            onClick={shareSummary}
          >
            {translate('actions.share')}
          </Button>
          <Button 
            danger 
            id="clearAll" 
            disabled={!products.length} 
            onClick={clearAllProducts}
          >
            {translate('actions.clear')}
          </Button>
        </Space>
      </Content>
      <Footer className="app-footer">
        {translate('app.footer').replace('{year}', new Date().getFullYear())}
      </Footer>
    </Layout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
