import { ArrowRight, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-indigo-300 mb-6">
                        Premium Web Tasarım & UI Kitleri
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Hayalinizdeki Siteyi <br />
                        <span className="gradient-text">Tasarlıyoruz</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Modern, hızlı ve estetik web şablonları ile projenizi bir adım öne taşıyın.
                        UI tasarımlarımızla kullanıcı deneyimini zirveye çıkarın.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button className="btn btn-primary text-lg px-8">
                            Kataloğu İncele <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline text-lg px-8">
                            Hizmetlerimiz <Palette size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Floating Mockup Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-16 relative mx-auto max-w-4xl"
                >
                    <div className="aspect-video glass rounded-xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center bg-black/40">
                        <p className="text-gray-500 font-medium">✨ 3D / Görsel Alanı Gelecek ✨</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
