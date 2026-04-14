import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Sparkles, MapPin, User, ArrowRight } from 'lucide-react';
import './index.css';

const SCENES = [
  {
    id: 1,
    title: "ტყის შესასვლელი",
    bgPhoto: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000",
    speaker: "წითელქუდა",
    text: "რა ლამაზი და იდუმალი ტყეა... ნახე, იქვე ბუჩქებში რაღაც ოქროსფრად ანათებს. ეს ხომ აურას პრემიუმ შოკოლადია?",
    choices: [
      { text: "გადაწმინდე ფოთლები და დააკვირდი", action: "reveal_item" }
    ],
    hiddenObjectId: 'aura-gold',
    hiddenObjectPos: { x: '70%', y: '60%' }
  },
  {
    id: 2,
    title: "ნაცარქექიას ბანაკი",
    bgPhoto: "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=2000",
    speaker: "ნაცარქექია",
    text: "ეი, მოგზაურო! ეგ ოქროსფერი ყუთი ჩემია. ნაცრის გარდა არაფერი მაქვს, შოკოლადი მაინც დამიტოვე, თორემ ჩემს ძალას განახებ!",
    choices: [
      { text: "მიეცი შოკოლადის ნაწილი", nextScene: 3, action: "give_item" },
      { text: "წინ აღუდექი", nextScene: 3 }
    ]
  },
  {
    id: 3,
    title: "კარლსონი ხის წვერზე",
    bgPhoto: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000",
    speaker: "კარლსონი",
    text: "მშვიდობა, მხოლოდ მშვიდობა! ჰეი, მე ვარ საუკეთესო მფრინავი კარლსონი. ხომ არ გაქვს შოკოლადი ჩემი ძრავისთვის?",
    choices: [
      { text: "დაეხმარე კარლსონს", nextScene: 4 },
      { text: "მხოლოდ შორიდან მიესალმე", nextScene: 4 }
    ],
    hiddenObjectId: 'aura-blue',
    hiddenObjectPos: { x: '30%', y: '40%' }
  },
  {
    id: 4,
    title: "ბაბაიაგას ქოხი",
    bgPhoto: "https://images.unsplash.com/photo-1587314168485-320c967eba67?q=80&w=2000",
    speaker: "ბაბაიაგა",
    text: "ჩემს საიდუმლო ტყეში შემოხვედი... ვგრძნობ პრემიუმ შოკოლადის სურნელს! იპოვე ჩემი დამალული კოლოფი თუ გინდა აქედან გასვლა.",
    choices: [
      { text: "განაგრძე ძიება", nextScene: 5 }
    ]
  },
  {
    id: 5,
    title: "კომბლეს სამფლობელო",
    bgPhoto: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=2000",
    speaker: "კომბლე",
    text: "კარგად გივლია! აი, ჩემი კომბლები სულ პრემიუმ შოკოლადებით მაქვს სავსე. შეიხედე ჩვენს სპეციალურ მაღაზიაში.",
    choices: [
      { text: "კოლექციის ნახვა", action: "open_shop", nextScene: 5 }
    ]
  }
];

const PRODUCTS = [
  { id: 1, name: "Aura Premium Gold", price: 35.00, img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80" },
  { id: 2, name: "Aura Dark Forest", price: 42.00, img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80" },
  { id: 3, name: "Aura Fairy Mix", price: 28.00, img: "https://plus.unsplash.com/premium_photo-1675800041444-8846bbbc61cb?w=400&q=80" },
  { id: 4, name: "Aura Magic Truffle", price: 55.00, img: "https://images.unsplash.com/photo-1511381939415-e4d3db26943e?w=400&q=80" }
];

function App() {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [cart, setCart] = useState([]);
  const [showShop, setShowShop] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [notification, setNotification] = useState("");
  const [foundObjects, setFoundObjects] = useState([]);
  const [revealItem, setRevealItem] = useState(false);

  const scene = SCENES.find(s => s.id === currentSceneId);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleChoice = (choice) => {
    if (choice.action === "reveal_item") {
      setRevealItem(true);
    } else if (choice.action === "give_item") {
      setCart(cart.filter(item => item.id !== 1));
      showNotification("თქვენ დათმეთ შოკოლადი... მაგრამ მიიღეთ კარგი კარმა ✨");
      if (choice.nextScene) setCurrentSceneId(choice.nextScene);
    } else if (choice.action === "open_shop") {
      setShowShop(true);
    } else if (choice.nextScene) {
      setCurrentSceneId(choice.nextScene);
      setRevealItem(false);
    }
  };

  const handleFindObject = () => {
    if (!foundObjects.includes(scene.hiddenObjectId)) {
      setFoundObjects([...foundObjects, scene.hiddenObjectId]);
      setRevealItem(false);
      addToCart(PRODUCTS[0]);
      showNotification("🎉 საიდუმლო ნივთი იპოვეთ! Aura Premium დაემატა კალათაში.");
      if (scene.id === 1) setCurrentSceneId(2);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    showNotification(`${product.name} დაემატა კალათაში`);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    showNotification("✨ გადახდა წარმატებულია! ჯადოსნური შოკოლადი გზაშია.");
    setCart([]);
    setShowCheckout(false);
    setShowShop(false);
    setCurrentSceneId(1);
  };

  return (
    <div className="font-sans antialiased text-white bg-black min-h-screen overflow-hidden relative">
      {/* Background with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${scene.bgPhoto})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 z-0"/>

      <div className="relative z-10 container mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 glass-panel p-4 rounded-2xl">
          <motion.div 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold tracking-widest text-[#fbd38d] drop-shadow-lg"
          >
            AURA <span className="font-light text-white">FOREST</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
            onClick={() => setShowShop(true)}
          >
            <ShoppingBag className="text-[#fbd38d]" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </motion.div>
        </header>

        {/* Scene Interactivity Area */}
        <div className="flex-1 relative">
          {/* Hidden Object */}
          <AnimatePresence>
            {scene.hiddenObjectId && !foundObjects.includes(scene.hiddenObjectId) && revealItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute cursor-pointer flex flex-col items-center gap-2 group z-20"
                style={{ left: scene.hiddenObjectPos.x, top: scene.hiddenObjectPos.y }}
                onClick={handleFindObject}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fbd38d] to-[#d69e2e] shadow-[0_0_30px_#fbd38d] animate-pulse flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="text-black" />
                </div>
                <div className="bg-black/80 px-3 py-1 rounded text-sm text-[#fbd38d] uppercase tracking-wider backdrop-blur-md">
                  აიღე შოკოლადი
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dialogue Box Overlay */}
        <motion.div 
          key={`dialogue-${scene.id}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel p-6 rounded-3xl max-w-4xl mx-auto w-full mb-8 border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#fbd38d] to-transparent" />
          <h2 className="text-xl text-[#fbd38d] font-bold mb-3 uppercase tracking-wider">{scene.speaker}</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-200">
            {scene.text}
          </p>
          <div className="flex flex-wrap gap-4">
            {scene.choices.map((choice, idx) => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx} 
                className="bg-gradient-to-r from-[#fbd38d] to-[#d69e2e] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(251,211,141,0.3)]"
                onClick={() => handleChoice(choice)}
              >
                {choice.text} <ArrowRight size={18} />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Shop / Cart Modal */}
      <AnimatePresence>
        {showShop && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto flex justify-center py-12 px-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-3xl max-w-5xl w-full p-8 relative shadow-2xl"
            >
              <button 
                className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition"
                onClick={() => setShowShop(false)}
              >
                <X size={24} />
              </button>
              
              {!showCheckout ? (
                <>
                  <h2 className="text-4xl font-light text-center mb-12 uppercase tracking-widest text-white">
                    <span className="text-[#fbd38d] font-bold">Aura</span> Collection
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {PRODUCTS.map(p => (
                      <div className="group relative bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-[#fbd38d]/50 transition-all duration-300" key={p.id}>
                        <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#fbd38d] transition-colors">{p.name}</h3>
                        <p className="text-[#fbd38d] mb-4 font-mono">₾{p.price.toFixed(2)}</p>
                        <button 
                          className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#fbd38d] hover:text-black font-bold transition-all flex items-center justify-center gap-2"
                          onClick={() => addToCart(p)}
                        >
                          <ShoppingBag size={18} /> დამატება
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-black to-[#1a1a1a] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center border border-white/10">
                    <div className="text-xl text-gray-300 mb-4 md:mb-0">
                      ჯამი: <span className="text-3xl font-bold text-[#fbd38d]">₾{cartTotal.toFixed(2)}</span>
                    </div>
                    {cart.length > 0 && (
                      <button 
                        className="bg-[#fbd38d] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors"
                        onClick={() => setShowCheckout(true)}
                      >
                        ყიდვა (Checkout)
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center text-[#fbd38d]">უსაფრთხო გადახდა</h2>
                  <form className="space-y-6" onSubmit={handleCheckoutSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm pl-1 flex items-center gap-2"><User size={14}/> სრული სახელი</label>
                        <input type="text" required placeholder="გიორგი გიორგაძე" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#fbd38d] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm pl-1 flex items-center gap-2"><MapPin size={14}/> მისამართი</label>
                        <input type="text" required placeholder="თბილისი, ჭავჭავაძის პროსპექტი" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#fbd38d] transition-colors" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-400 text-sm pl-1">ბარათის ნომერი</label>
                      <input type="text" required pattern="[0-9]{16}" placeholder="1234 5678 9101 1121" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#fbd38d] transition-colors font-mono tracking-widest" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm pl-1">ვადა (MM/YY)</label>
                        <input type="text" required placeholder="12/26" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#fbd38d] transition-colors font-mono" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm pl-1">CVV/CVC</label>
                        <input type="text" required placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#fbd38d] transition-colors font-mono" />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-6">
                      <button type="button" className="flex-1 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors" onClick={() => setShowCheckout(false)}>
                        დაბრუნება
                      </button>
                      <button type="submit" className="flex-1 py-4 rounded-xl bg-[#fbd38d] text-black font-bold hover:bg-[#d69e2e] transition-colors shadow-[0_0_20px_rgba(251,211,141,0.3)]">
                        გადახდა (₾{cartTotal.toFixed(2)})
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-[#fbd38d] to-[#d69e2e] text-black px-6 py-4 rounded-xl font-bold shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[100] flex items-center gap-3"
          >
            <Sparkles size={20} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
